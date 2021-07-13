import { mutate } from "swr";
import create from "zustand";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import { Category } from "../modules/categories";
import produce from "immer";

// This is used when optimistically updating the UI before revalidating cache.
// Used when updating or creating category and client does not yet have all the data from the backend
type TempCategory = {
  name: string;
  id?: string | number;
};

interface CategoriesState {
  categories: Category[] | TempCategory[];
  setCategories: (categories: Category[]) => void;
  createCategory: (api: CategoryApi, name: string) => void;
  getCategory: (id: number) => Category | TempCategory | undefined;
  updateCategory: (api: CategoryApi, id: number, newName: string) => void;
  deleteCategory: (api: CategoryApi, id: number) => void;
  addChannelToCategory: (
    api: CategoryApi,
    categoryId: number,
    channelName: string,
    channelId: string
  ) => void;
}

// Call swr mutations in setters
const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],

  getCategory: (id) => get().categories.find((c) => c.id === id),

  setCategories: (categories: Category[]) => {
    set({
      categories: [...categories],
    });
  },

  createCategory: async (api: CategoryApi, name: string) => {
    let newCategory: TempCategory;

    // Update UI
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        newCategory = { name };
        const updatedState = data?.categories
          ? [...data.categories, newCategory]
          : [];

        // Update store
        set(() => ({ categories: updatedState }));
        return { ...data, categories: updatedState };
      },
      false
    );

    await api.createCategory(name);

    // revalidate to make sure local data is correct
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        // change store state after revalidation
        const updatedState = data?.categories ? [...data.categories] : [];

        set(() => ({ categories: updatedState }));
        return { ...data };
      }
    );
  },

  updateCategory: async (api, id, newName) => {
    let editedCategory: TempCategory;

    // update local data for optimistic update, but don't revalidate (refetch)
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        editedCategory = { id, name: newName };
        // TODO: find better way of doing this
        const categoriesToKeep = data?.categories?.filter((c) => c.id !== id);
        const updatedState = categoriesToKeep
          ? [...categoriesToKeep, editedCategory]
          : [];

        // Update store
        set(() => ({ categories: updatedState }));
        return {
          ...data,
          categories: updatedState,
        };
      },
      false
    );

    await api.updateCategory(id, newName);

    // revalidate to make sure local data is correct
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        // change store state after revalidation
        const updatedState = data.categories ? [...data.categories] : [];

        set(() => ({
          categories: updatedState,
        }));

        return { ...data };
      }
    );
  },

  deleteCategory: async (api, id) => {
    mutate(
      `/api/v1.0/users/current_user/categories`,
      async (data: CategoryResponse) => {
        // Filter out category to delete from data
        const categoriesToKeep = data?.categories?.filter((c) => c.id !== id);
        const updatedState = categoriesToKeep ? [...categoriesToKeep] : [];

        // Update store
        set(() => ({ categories: updatedState }));
        return { ...data, categories: updatedState };
      },
      false
    );

    await api.deleteCategory(id);

    // revalidate to make sure local data is correct
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        const updatedState = data.categories ? [...data.categories] : [];

        // change store state after revalidation
        set(() => ({ categories: updatedState }));

        return { ...data };
      }
    );
  },

  addChannelToCategory: async (api, categoryId, channelName, channelId) => {
    mutate(
      `/api/v1.0/users/current_user/categories/${categoryId}`,
      (data: CategoryResponse) => {
        // FIXME: this does not always run, look like data is sometimes undefined so it returns early
        console.log("IN ZXUASTAND ACXTION", data)
        if (!data || !data.category) return;

        // Update store
        set(
          produce((state) => {
            const category = get().categories.find(
              (c: Category) => c.id === categoryId
            );

            if (category) {
              // get index of category the channel is added to
              const idx = get().categories.indexOf(category as Category);

              console.log("INDEX OF CATEGORY TO ADD CHANNEL TO", idx)

              // update store
              state.categories[idx].channels.push({
                name: channelName,
                yt_channel_id: channelId,
              });
            }
          })
        );

        return {
          ...data,
          category: {
            ...data.category,
            channels: [
              ...data.category.channels,
              {
                name: channelName,
                yt_channel_id: channelId,
              },
            ],
          },
        };
      },
      false
    );

    await api.addChannelToCategory(categoryId, channelName, channelId);

    // Revalidate cache
    mutate(`/api/v1.0/users/current_user/categories/${categoryId}`);
  },
}));

export default useCategoriesStore;

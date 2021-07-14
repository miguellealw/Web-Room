import { mutate } from "swr";
import create from "zustand";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import { Category } from "../modules/categories";
import { TempCategory } from "../modules/categories";

interface CategoriesState {
  categories: Category[] | TempCategory[];
  setCategories: (categories: Category[]) => void;
  createCategory: (api: CategoryApi, name: string) => void;
  getCategory: (id: number) => Category | TempCategory | undefined;
  updateCategory: (api: CategoryApi, id: number, newName: string) => void;
  deleteCategory: (api: CategoryApi, id: number) => void;
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
}));

export default useCategoriesStore;

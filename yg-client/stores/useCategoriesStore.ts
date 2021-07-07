import { mutate } from "swr";
import create from "zustand";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import { Category } from "../pages/api/types";

// This is used when optimistically updating the UI before revalidating cache
// used when updating or creating category and client does not yet have all the data from the backend
type TempCategory = {
  name: string;
  id?: string | number;
};

interface CategoriesState {
  categories: Category[] | TempCategory[];
  setCategories: (categories: Category[]) => void;
  createCategory: (api: CategoryApi, name: string) => void;
  getCategory: (id: string | number) => Category | TempCategory | undefined;
  updateCategory: (
    api: CategoryApi,
    id: string | number,
    newName: string
  ) => void;
  deleteCategory: (api: CategoryApi, id: string | number) => void;
}

// Call swr mutates in setters
const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],

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
        // Update store
        set(() => ({ categories: [...data.categories, newCategory] }));
        return { ...data, categories: [...data.categories, newCategory] };
      },
      false
    );

    await api.createCategory(name);

    // revalidate to make sure local data is correct
    mutate(`/api/v1.0/users/current_user/categories`, data => {
      set(() => ({ categories: [...data.categories] }));
    });
  },

  getCategory: (id) => get().categories.find((c) => c.id === parseInt(id)),

  updateCategory: async (api, id, newName) => {
    let editedCategory: TempCategory;

    // update local data for optimistic update, but don't revalidate (refetch)
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        editedCategory = { id, name: newName };
        // TODO: find better way of doing this
        const categoriesToKeep = data?.categories?.filter((c) => c.id !== id);
        // Update store
        set(() => ({ categories: [...categoriesToKeep, editedCategory] }));
        return {
          ...data,
          categories: [...categoriesToKeep, editedCategory],
        };
      },
      false
    );

    await api.updateCategory(id, newName);

    // revalidate to make sure local data is correct
    mutate(`/api/v1.0/users/current_user/categories`, data => {
      // TODO: change store state after revalidation
      set(() => ({ categories: [...data.categories] }));
    });
  },
  deleteCategory: async (api, id) => {
    mutate(
      `/api/v1.0/users/current_user/categories`,
      async (data: CategoryResponse) => {
        // Filter out category to delete from data
        const categoriesToKeep = data?.categories?.filter((c) => c.id !== id);
        // Update store
        set(() => ({ categories: [...categoriesToKeep] }));
        return { ...data, categories: [...categoriesToKeep] };
      },
      false
    );

    await api.deleteCategory(id);

    // revalidate to make sure local data is correct
    mutate(`/api/v1.0/users/current_user/categories`);
  },
}));

export default useCategoriesStore;

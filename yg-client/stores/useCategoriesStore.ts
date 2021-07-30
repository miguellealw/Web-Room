import { mutate } from "swr";
import create from "zustand";
import { CategoryApi, CategoryResponse } from "../pages/api/old_categories";
import { Category } from "../modules/categories";
import { TempCategory } from "../modules/categories";
import { toast } from "react-toastify";
import axios from "axios";

interface CategoriesState {
  categories: (Category | TempCategory)[];
  setCategories: (categories: Category[]) => void;
  getCategory: (id: number) => Category | TempCategory | undefined;
  createCategory: (name: string) => any;
  updateCategory: (id: number, newName: string) => any;
  deleteCategory: (id: number) => any;
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

  createCategory: async (name: string) => {
    let newCategory: TempCategory;

    // Update UI
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        newCategory = { name };
        const updatedState = data ? [...data, newCategory] : [];

        // Update store
        set(() => ({ categories: updatedState }));
        // return { ...data, categories: updatedState };
        return [...updatedState];
      },
      false
    );

    let createdCategory = await axios({
      method: "POST",
      url: `/api/categories`,
      data: { name },
    }).then((res) => res.data);

    // revalidate to make sure local data is correct
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        // change store state after revalidation
        const updatedState = data ? [...data] : [];

        set(() => ({ categories: updatedState }));
        return [...data];
      }
    );

    toast.dark("Category Created");

    return createdCategory;
  },

  updateCategory: async (id, newName) => {
    let editedCategory: TempCategory;

    // update local data for optimistic update, but don't revalidate (refetch)
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        editedCategory = { id, name: newName };
        // TODO: find better way of doing this
        const categoriesToKeep = data?.filter((c) => c.id !== id);
        const updatedState = categoriesToKeep
          ? [...categoriesToKeep, editedCategory]
          : [];

        // Update store
        set(() => ({ categories: updatedState }));
        return [...updatedState];
      },
      false
    );

    let cat = await axios({
      method: "PUT",
      url: `/api/categories/${id}`,
      data: { name: newName },
    }).then((res) => res.data);

    // revalidate to make sure local data is correct
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        // change store state after revalidation
        const updatedState = data ? [...data] : [];

        set(() => ({
          categories: updatedState,
        }));

        return [...data];
      }
    );

    toast.dark("Category Updated");
    return cat;
  },

  deleteCategory: async (id) => {
    mutate(
      `/api/v1.0/users/current_user/categories`,
      async (data: CategoryResponse) => {
        // Filter out category to delete from data
        const categoriesToKeep = data?.filter((c) => c.id !== id);
        const updatedState = categoriesToKeep ? [...categoriesToKeep] : [];

        // Update store
        set(() => ({ categories: updatedState }));
        toast.dark("Category Deleted");
        // return { ...data, categories: updatedState };
        return [...data];
      },
      false
    );

    let cat = await axios({
      method: "DELETE",
      url: `/api/categories/${id}`,
    }).then((res) => res.data);

    // revalidate to make sure local data is correct
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        const updatedState = data ? [...data] : [];

        // change store state after revalidation
        set(() => ({ categories: updatedState }));

        return [...data];
      }
    );

    return cat;
  },
}));

export default useCategoriesStore;

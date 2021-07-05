import { mutate } from "swr";
import create from "zustand";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";

// Call swr mutates in setters
const useCategoriesStore = create((set) => ({
  categories: [],
  // setCategories: (categories) => set((state) => [...state, ...categories]),
  // createCategory: (api: CategoryApi, name: string) => {
  createCategory: async (api: CategoryApi, name: string) => {
    let newCategory;

    // Update UI
    mutate(
      `/api/v1.0/users/current_user/categories`,
      (data: CategoryResponse) => {
        newCategory = {name}
        return { ...data, categories: [...data.categories, newCategory] };
      },
      false
    );

    await api.createCategory(name);

    // revalidate to make sure local data is correct
    mutate(`/api/v1.0/users/current_user/categories`);

    return set((state) => [...state.categories, newCategory]);
  },
  // getCategory: (id) =>
  //   set((state) => state.categories.find((category) => category.id === id)),
  // editCategory: () => set((state) => state),
  // removeCategoryById: () => set((state) => state),
}));

export default useCategoriesStore;

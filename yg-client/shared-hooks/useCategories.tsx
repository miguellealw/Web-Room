import { useCallback, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import { confirm } from "../components/DeleteConfirmationModal";
import useCategoriesStore from "../stores/useCategoriesStore";

export interface useCategoriesType {
  // handleDeleteCategory: (id: number, name: string) => void;
  updateCategory: (id: number, newName: string) => Promise<void>;
  deleteCategory: (id: number, name: string) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
}

const useCategories: () => useCategoriesType = () => {
  // const createCategory = useCategoriesStore(useCallback((state) => state.createCategory, []));
  const createCategory = useCategoriesStore((state) => state.createCategory);
  // useMemo will return the same instance of CategoryApi instead of creating a new one
  let api = useMemo(() => new CategoryApi(), []);
  api.setup();

  // TODO: may not need to wrap in useCallback
  // CREATE
  const memoCreateCategory = useCallback(
    async (name: string) => {
      await createCategory(api, name);
    },
    [api]
  );

  // UPDATE
  const memoUpdateCategory = useCallback(
    async function updateCategory(id: number, newName: string) {
      // update local data for optimistic update, but don't revalidate (refetch)
      mutate(
        `/api/v1.0/users/current_user/categories`,
        (data: CategoryResponse) => {
          // TODO: find better way of doing this
          const categoriesToKeep = data?.categories?.filter(
            (category) => category.id !== id
          );
          return {
            ...data,
            categories: [...categoriesToKeep, { id, name: newName }],
          };
        },
        false
      );

      await api.updateCategory(id, newName);

      // revalidate to make sure local data is correct
      mutate(`/api/v1.0/users/current_user/categories`);
    },
    [api]
  );

  // DELETE
  const memoDeleteCategory = useCallback(
    async function deleteCategory(id: number, name: string) {
      try {
        // Get category name for confirmation message
        await confirm(`Are you sure you want to delete ${name}?`);

        mutate(
          `/api/v1.0/users/current_user/categories`,
          async (data: CategoryResponse) => {
            // Filter out category to delete from data
            const categoriesToKeep = data?.categories?.filter(
              (category) => category.id !== id
            );

            return { ...data, categories: [...categoriesToKeep] };
          },
          false
        );

        await api.deleteCategory(id);

        // revalidate to make sure local data is correct
        mutate(`/api/v1.0/users/current_user/categories`);
      } catch (err) {
        // console.error(err);
        return;
      }
    },
    [api]
  );

  return {
    updateCategory: memoUpdateCategory,
    deleteCategory: memoDeleteCategory,
    createCategory: memoCreateCategory,
  };
};

export default useCategories;

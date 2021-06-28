import { useCallback, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";

function useCategories() {
  // useMemo will return the same instance of CategoryApi instead of creating a new one
  let api = useMemo(() => new CategoryApi(), [])
  api.setup();

  const memoDeleteCategory = useCallback(
    async function deleteCategory(id: number) {
      mutate(`/api/v1.0/users/current_user/categories` ,(data: CategoryResponse) => {
        const categoriesToKeep = data?.categories?.filter(
          (category) => category.id !== id
        );
        return { ...data, categories: [...categoriesToKeep] };
      }, false);

      await api.deleteCategory(id);

      // revalidate to make sure local data is correct
      mutate(`/api/v1.0/users/current_user/categories`);
    },
    [api]
  );

  const memoCreateCategory = useCallback(
    async function createCategory(name: string) {
      // Update ui
      mutate(`/api/v1.0/users/current_user/categories`, (data: CategoryResponse) => {
        return { ...data, categories: [...data.categories, { name }] };
      }, false);

      await api.createCategory(name);

      // revalidate to make sure local data is correct
      mutate(`/api/v1.0/users/current_user/categories`);
    },
    [api]
  );

  const memoUpdateCategory = useCallback(
    async function updateCategory(id: number, newName: string) {
      // update local data for optimistic update, but don't revalidate (refetch)
      mutate(`/api/v1.0/users/current_user/categories`, (data: CategoryResponse) => {
        // TODO: find better way of doing this
        const categoriesToKeep = data?.categories?.filter(
          (category) => category.id !== id
        );
        return {
          ...data,
          categories: [...categoriesToKeep, { id, name: newName }],
        };
      }, false);

      await api.updateCategory(id, newName);

      // revalidate to make sure local data is correct
      mutate(`/api/v1.0/users/current_user/categories`);
    },
    [api]
  );

  return {
    updateCategory: memoUpdateCategory,
    deleteCategory: memoDeleteCategory,
    createCategory: memoCreateCategory,
  };
}

export default useCategories;

import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";

function useCategories() {
  const api = new CategoryApi();
  api.setup();
  const fetcher = () => api.getUserCategories();
  const {
    data,
    error,
    mutate: mutateCategories,
  } = useSWR(`/api/v1.0/users/current_user/categories`, fetcher, {
    revalidateOnFocus: false,
  });

  async function deleteCategory(id: number) {
    mutateCategories((data) => {
      const categoriesToKeep = data?.categories?.filter(
        (category) => category.id !== id
      );
      return { ...data, categories: [...categoriesToKeep] };
    }, false);

    await api.deleteCategory(id);

    // revalidate to make sure local data is correct
    mutateCategories();
  }

  async function addCategory(name: string) {
    // Update ui
    mutateCategories((data) => {
      return { ...data, categories: [...data.categories, { name }] };
    }, false);

    const api = new CategoryApi();
    api.setup();
    await api.createCategory(value);

    // revalidate to make sure local data is correct
    mutateCategories();
  }

  async function updateCategory(id: number, newName: string) {
    // update local data for optimistic update, but don't revalidate (refetch)
    mutateCategories((data) => {
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
    mutateCategories();
  }

  return {
    data,
    error,
    mutateCategories,
    isLoading: !data,
    updateCategory,
    deleteCategory,
    addCategory,
  };
}

export default useCategories;

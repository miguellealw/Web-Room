import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";

function useCategory(id: string | string[] | undefined) {
  const api = new CategoryApi();
  api.setup();
  const fetcher = () => api.getUserCategoryById(id);
  const { data, error } = useSWR(
    `/api/v1.0/users/current_user/categories/${id}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !data,
  };
}

export default useCategory;

import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";

function useCategories() {
  const api = new CategoryApi();
  api.setup();
  const fetcher = () => api.getUserCategories();
  const { data, error, mutate } = useSWR(
    `/api/v1.0/users/current_user/categories`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    mutateCategories: mutate,
    isLoading: !data,
  };
}

export default useCategories;

import { useMemo } from "react";
import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";


const useFetchCategories = () => {
  let api = useMemo(() => new CategoryApi(), [])
  api.setup();
  const fetcher = () => api.getUserCategories();
  const {
    data,
    error,
    mutate: mutateCategories,
  } = useSWR(`/api/v1.0/users/current_user/categories`, fetcher, {
    revalidateOnFocus: false,
  });

	return {
    data,
    error,
    mutateCategories,
    isLoading: !data,
	}
}

export default useFetchCategories
import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { CategoryApi } from "../pages/api/old_categories";

const useFetchCategory = (id: string | string[] | undefined) => {
  // useMemo will return the same instance of CategoryApi instead of creating a new one
  // const api = useMemo(() => new CategoryApi(), []);
  // api.setup();
  // const fetcher = () => api.getUserCategoryById(id);
  const fetcher = () => axios.get(`/api/categories/${id}`).then((res) => res.data);
  const {
    data,
    error,
    mutate,
  } = useSWR(`/api/v1.0/users/current_user/categories/${id}`, fetcher);

  return {
    data,
    error,
		mutate,
    isLoading: !data,
  };
};

export default useFetchCategory;

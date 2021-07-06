import React from "react";
import { useMemo } from "react";
import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";
import useCategoriesStore from "../stores/useCategoriesStore";

const useFetchCategories = () => {
  let api = useMemo(() => new CategoryApi(), []);
  api.setup();
  const fetcher = () => api.getUserCategories();

  const {
    data,
    error,
    mutate: mutateCategories,
  } = useSWR(`/api/v1.0/users/current_user/categories`, fetcher, {
    revalidateOnFocus: false,
  });

  // Update store
  const setCategories = useCategoriesStore((state) => state.setCategories);
  React.useEffect(() => {
    if (data) setCategories(data.categories);
  }, [data, setCategories, data?.categories]);

  return {
    data,
    error,
    mutateCategories,
    isLoading: !data,
  };
};

export default useFetchCategories;

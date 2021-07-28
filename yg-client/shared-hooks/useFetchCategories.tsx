import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import React from "react";
import { useMemo } from "react";
import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";
import useCategoriesStore from "../stores/useCategoriesStore";

const useFetchCategories = () => {
  const fetcher = () => axios.get(`/api/n_categories`).then((res) => res.data);

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
    if (data && !error) setCategories(data);
  }, [data, error, setCategories]);

  return {
    data,
    error,
    mutateCategories,
    isLoading: !data,
  };
};

export default useFetchCategories;

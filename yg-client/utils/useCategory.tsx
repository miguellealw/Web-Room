import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";

function useCategory(id: string | string[] | undefined) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();
  const fetcher = () => api.getUserCategoryById(id);
  const {
    data,
    error,
    mutate: mutateCategory,
  } = useSWR(`/api/v1.0/users/current_user/categories/${id}`, fetcher);

  const memoRemoveChannelFromCategory = useCallback(
    async function removeChannelFromCategory(
      channelName: string,
      channelId: string
    ) {
      const channelsToKeep = data?.category?.channels?.filter(
        (channel) => channel.id !== channelId
      );

      // update ui / local cache
      mutateCategory({
        ...data,
        category: { ...data.category, channels: [...channelsToKeep] },
      });

      await api.removeChannelFromCategory(id, channelName, channelId);

      // revalidate cache
      mutateCategory();
    },
    [api, id]
  );

  const memoAddChannelToCategory = useCallback(
    async function addChannelToCategory(
      channelName: string,
      channelId: string
    ) {
      // Update ui
      // TODO: figure out how to add channel to array. maybe pass channel thumbnail into callback
      // mutateCategory({
      //   ...data,
      //   category: { ...data.category, channels: [...channels, {

      //   }] },
      // });

      await api.addChannelToCategory(id, channelName, channelId);

      // Revalidate cache
      mutateCategory();
    },
    [api, id]
  );

  return {
    data,
    error,
    isLoading: !data,
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

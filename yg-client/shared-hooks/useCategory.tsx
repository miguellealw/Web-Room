import { useCallback, useMemo } from "react";
import { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";

function useCategory(id: string) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();

  const memoRemoveChannelFromCategory = useCallback(
    async function removeChannelFromCategory(
      channelName: string,
      channelId: string
    ) {
      // update ui / local cache w/out revalidation
      mutate(
        `/api/v1.0/users/current_user/categories/${id}`,
        (data: CategoryResponse) => {
          if (!data || !data.category) return;

          const channelsToKeep = data.category.channels.filter(
            (channel) => channel.yt_channel_id !== channelId
          );

          return {
            ...data,
            category: { ...data.category, channels: [...channelsToKeep] },
          };
        },
        false
      );

      await api.removeChannelFromCategory(id, channelName, channelId);

      // revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${id}`);
    },
    [api, id]
  );

  const memoAddChannelToCategory = useCallback(
    async function addChannelToCategory(
      categoryId: number,
      channelName: string,
      channelId: string
    ) {
      // Update ui
      mutate(
        `/api/v1.0/users/current_user/categories/${id}`,
        (data: CategoryResponse) => {
          if (!data || !data.category) return;

          return {
            ...data,
            category: {
              ...data.category,
              channels: [
                ...data.category.channels,
                {
                  name: channelName,
                  yt_channel_id: channelId,
                },
              ],
            },
          };
        },
        false
      );

      await api.addChannelToCategory(categoryId, channelName, channelId);

      // Revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${categoryId}`);
    },
    [api, id]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

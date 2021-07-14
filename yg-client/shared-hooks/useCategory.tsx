import { useCallback, useMemo } from "react";
import { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import useEmitToast from "./useEmitToast";

function useCategory(id: number) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();

  const { notifySuccess: notifySuccessAdd } = useEmitToast();
  const { notifySuccess: notifySuccessRemove } = useEmitToast();

  const memoAddChannelToCategory = useCallback(
    async (channelName: string, channelId: string) => {
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

      await api.addChannelToCategory(id, channelName, channelId);
      notifySuccessAdd(`${channelName} Added to Category`);

      // Revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${id}`);
    },
    [api, id, notifySuccessAdd]
  );

  const memoRemoveChannelFromCategory = useCallback(
    async (channelName: string, channelId: string) => {
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
      notifySuccessRemove(`${channelName} Removed from Category`);

      // revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${id}`);
    },
    [api, id, notifySuccessRemove]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

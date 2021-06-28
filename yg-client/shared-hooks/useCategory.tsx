import { useCallback, useMemo } from "react";
import { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";

function useCategory(id: string | string[] | undefined) {
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
          const channelsToKeep = data?.category?.channels?.filter(
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
      channelName: string,
      channelId: string
    ) {
      // Update ui
      // TODO: figure out how to add channel to array. maybe pass channel thumbnail into callback
      // mutate(
      //   `/api/v1.0/users/current_user/categories/${id}`,
      //   (data: CategoryResponse) => {
      //     return {
      //       ...data,
      //       category: {
      //         ...data.category,
      //         channels: [...data.category.channels],
      //       },
      //     };
      //   }
      // );

      await api.addChannelToCategory(id, channelName, channelId);

      // Revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${id}`);
    },
    [api, id]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

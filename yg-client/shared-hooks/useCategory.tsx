import React, { useCallback, useMemo } from "react";
import { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import useEmitToast from "./useEmitToast";

// TODO: id is optional to category id is not known when adding channel to category
function useCategory(categoryId?: number) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();

  const { notifySuccess: notifySuccessAdd, notifyError: notifyErrorAdd } =
    useEmitToast();
  const { notifySuccess: notifySuccessRemove } = useEmitToast();

  // TODO: pass ID to function for deferred creation of category
  const memoAddChannelToCategory = useCallback(
    async (channelName: string, channelId: string, id?: number) => {
      // Update ui
      // mutate(
      //   `/api/v1.0/users/current_user/categories/${id}`,
      //   (data: CategoryResponse) => {
      //     if (!data || !data.category) return;

      //     // TODO: use immer here
      //     return {
      //       ...data,
      //       category: {
      //         ...data.category,
      //         channels: [
      //           ...data.category.channels,
      //           {
      //             name: channelName,
      //             yt_channel_id: channelId,
      //           },
      //         ],
      //       },
      //     };
      //   },
      //   false
      // );

      const selectedID = categoryId ? categoryId : id

      const { category, errorMessage } = await api.addChannelToCategory(
        selectedID,
        channelName,
        channelId
      );

      // Revalidate cache
      // FIXME: cache check does not remove dummy data from prev mutate when channel is already present in category
      // mutate(`/api/v1.0/users/current_user/categories/${id}`, data => {
      //   console.log("data", data)
      // });

      if (!errorMessage) {
        // <CheckCircleIcon className="w-4 h-4 mr-1" /> Added
        // notifySuccessAdd(`✅ ${channelName} Added to Category`);
        notifySuccessAdd(
          <div>
            <span className="text-green-500 font-bold">{channelName} </span>
            Added to Category!
          </div>
        );
      } else {
        // notifyErrorAdd(`${channelName} Already in Category!`);
        notifyErrorAdd(
          <div>
            <span className="font-bold text-red-500">{channelName} </span>
            Already in Category!
          </div>
        );
      }
    },
    [api, categoryId, notifySuccessAdd, notifyErrorAdd]
  );

  const memoRemoveChannelFromCategory = useCallback(
    async (channelName: string, channelId: string) => {
      mutate(
        `/api/v1.0/users/current_user/categories/${categoryId}`,
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

      await api.removeChannelFromCategory(categoryId, channelName, channelId);
      // notifySuccessRemove(`⚠ ${channelName} Removed from Category`);
      notifySuccessRemove(
        <div>
          <span className="text-red-500 font-bold">{channelName} </span>
          Removed from Category!
        </div>
      );

      // revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${categoryId}`);
    },
    [api, categoryId, notifySuccessRemove]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

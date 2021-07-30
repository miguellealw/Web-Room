import axios, { AxiosResponse } from "axios";
import React, { useCallback, useMemo } from "react";
import { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/old_categories";
import useEmitToast from "./useEmitToast";

// id is optional to category when id is not known when adding channel to category
function useCategory(categoryId?: number) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();

  const { notifySuccess: notifySuccessAdd, notifyError: notifyErrorAdd } =
    useEmitToast();
  const { notifySuccess: notifySuccessRemove } = useEmitToast();

  const memoAddChannelToCategory = useCallback(
    async (channelName: string, channelId: string, id?: number) => {
      if (!id && !categoryId) {
        throw new Error(
          "Id must be passed to addChannelToCategory callback or to the useCategory hook"
        );
      }

      const selectedID = (categoryId as number) || (id as number);

      // Update ui
      mutate(
        `/api/v1.0/users/current_user/categories/${selectedID}`,
        (data: CategoryResponse) => {
          if (!data || !data.category) return;

          // TODO: use immer here
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

      try {
        await axios({
          method: "POST",
          url: `/api/categories/${selectedID}/add_channel`,
          data: {
            name: channelName,
            yt_channel_id: channelId,
          },
        });

        notifySuccessAdd(
          <div>
            <span className="text-green-500 font-bold">{channelName} </span>
            Added to Category!
          </div>
        );
      } catch (e) {
        // notifyErrorAdd(`${channelName} Already in Category!`);
        notifyErrorAdd(
          <div>
            <span className="font-bold text-red-500">{channelName} </span>
            Already in Category!
          </div>
        );
      }

      // Revalidate cache
      // FIXME: cache check does not remove dummy data from prev mutate when channel is already present in category
      mutate(`/api/v1.0/users/current_user/categories/${selectedID}`, data => {
        console.log("data", data)
      });
    },
    [categoryId, notifySuccessAdd, notifyErrorAdd]
  );

  const memoRemoveChannelFromCategory = useCallback(
    async (channelName: string, channelId: string) => {
      if (!categoryId) {
        throw new Error(
          "Id must be passed to addChannelToCategory callback or to the useCategory hook"
        );
      }

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

      try {
        await axios({
          method: "POST",
          url: `/api/categories/${categoryId}/remove_channel`,
          data: {
            name: channelName,
            yt_channel_id: channelId,
          },
        });
        notifySuccessRemove(
          <div>
            <span className="text-red-500 font-bold">{channelName} </span>
            Removed from Category!
          </div>
        );
      } catch (e) {}

      // revalidate cache
      mutate(`/api/v1.0/users/current_user/categories/${categoryId}`);
    },
    [categoryId, notifySuccessRemove]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

import { mutate } from "swr";
import create from "zustand";
import { Category } from "../modules/categories";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import produce from "immer";

export interface CategoryState {
  currentCategory: Category | {};
  setCurrentCategory: (category: Category) => void;
  addChannelToCategory: (
    api: CategoryApi,
    categoryId: number,
    channelName: string,
    channelId: string
  ) => void;
  removeChannelFromCategory: (
    api: CategoryApi,
    categoryId: number,
    channelName: string,
    channelId: string
  ) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  currentCategory: {},

  setCurrentCategory: (category: Category) => {
    set({ currentCategory: category });
  },

  addChannelToCategory: async (api, categoryId, channelName, channelId) => {
    // Update ui
    mutate(
      `/api/v1.0/users/current_user/categories/${categoryId}`,
      (data: CategoryResponse) => {
        if (!data || !data.category) return;

        set(
          produce((state) => {
            state.currentCategory.channels.push({
              name: channelName,
              yt_channel_id: channelId,
            });
          })
        );

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

  removeChannelFromCategory: async (
    api,
    categoryId,
    channelName,
    channelId
  ) => {
    // update ui / local cache w/out revalidation
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

    // revalidate cache
    mutate(`/api/v1.0/users/current_user/categories/${categoryId}`);
  },
}));

export default useCategoryStore;

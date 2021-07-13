import { useCallback, useMemo } from "react";
import { CategoryApi } from "../pages/api/categories";
import useCategoryStore from "../stores/useCategoryStore";
import shallow from "zustand/shallow";
import useCategoriesStore from "../stores/useCategoriesStore";

function useCategory(id: number) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();

  const { removeChannelFromCategory } = useCategoryStore(
    (state) => ({
      // addChannelToCategory: state.addChannelToCategory,
      removeChannelFromCategory: state.removeChannelFromCategory,
    }),
    shallow
  );

  const { addChannelToCategory } = useCategoriesStore(
    (state) => ({
      addChannelToCategory: state.addChannelToCategory,
    }),
    shallow
  );

  const memoAddChannelToCategory = useCallback(
    async (channelName: string, channelId: string) => {
      await addChannelToCategory(api, id, channelName, channelId);
    },
    [api, id, addChannelToCategory]
  );

  const memoRemoveChannelFromCategory = useCallback(
    async (channelName: string, channelId: string) => {
      await removeChannelFromCategory(api, id, channelName, channelId);
    },
    [api, id, removeChannelFromCategory]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

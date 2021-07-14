import { useCallback, useMemo } from "react";
import { CategoryApi } from "../pages/api/categories";

function useCategory(id: number) {
  const api = useMemo(() => new CategoryApi(), []);
  api.setup();

  const memoAddChannelToCategory = useCallback(
    async (channelName: string, channelId: string) => {
      await api.addChannelToCategory(id, channelName, channelId);
    },
    [api, id]
  );

  const memoRemoveChannelFromCategory = useCallback(
    async (channelName: string, channelId: string) => {
      // await removeChannelFromCategory(api, id, channelName, channelId);
      await api.removeChannelFromCategory(id, channelName, channelId);
    },
    [api, id]
  );

  return {
    addChannelToCategory: memoAddChannelToCategory,
    removeChannelFromCategory: memoRemoveChannelFromCategory,
  };
}

export default useCategory;

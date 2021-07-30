import useSWR from "swr";
import { ChannelsApi } from "../pages/api/old_channels";

function useFetchChannels() {
  const api = new ChannelsApi();
  api.setup();
  const fetcher = () => api.get_yt_channels();

  const { data, error, mutate } = useSWR(
    `/api/v1.0/users/current_user/yt-channels`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  // only get channels user owns
  // const fetcher = () => api.get_channels()
  // const {data, error} = useSWR(`/api/v1.0/users/current_user/channels`, fetcher)

  return {
    data: data?.channels?.items,
    nextPageToken: data?.channels?.nextPageToken,
    prevPageToken: data?.channels?.prevPageToken,
    pageInfo: data?.channels?.pageInfo,
    error,
    mutateChannels: mutate,
    isLoading: !data,
  };
}

export default useFetchChannels;

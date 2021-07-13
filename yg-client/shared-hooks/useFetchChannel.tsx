import useSWR from "swr";
import { ChannelsApi } from "../pages/api/channels";

function useFetchChannel(id: string) {
  const api = new ChannelsApi();
  api.setup();
  const fetcher = () => api.getChannelById(id);

  const { data, error, mutate } = useSWR(
    `/api/v1.0/users/current_user/channels/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data?.channels,
    error,
    mutateChannels: mutate,
    isLoading: !data,
  };
}

export default useFetchChannel;

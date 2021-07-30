import useSWR from "swr";
import { Channel } from "../modules/channels";
import { ChannelsApi } from "../pages/api/old_channels";

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
    data: data?.channels as Channel,
    error,
    mutateChannel: mutate,
    isLoading: !data,
  };
}

export default useFetchChannel;

import useSWR from "swr";
import { ChannelsApi } from "../pages/api/channels";

function useChannels() {
	const api = new ChannelsApi();
	api.setup();
  const fetcher = () => api.get_yt_channels()
	const {data, error} = useSWR(`/api/v1.0/users/current_user/yt-channels`, fetcher)


	// only get channels user owns
  // const fetcher = () => api.get_channels()
	// const {data, error} = useSWR(`/api/v1.0/users/current_user/channels`, fetcher)

	return {
		data: data?.channels.channels.items,
		error,
		isLoading: !data
	}
}

export default useChannels
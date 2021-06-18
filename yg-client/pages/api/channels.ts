import { AxiosResponse } from "axios";
import { Api } from "./api";
import { Channel } from "./types";

type ChannelResponse = {
	kind: "ok",
	channels: Channel[]
};

export class ChannelsApi extends Api {
	async get_channels(): Promise<ChannelResponse> {
		const response: AxiosResponse<any> = await this.axios.get('/api/v1.0/users/current_user/channels')

		return {
			kind: "ok",
			channels: response.data
		}
	}
}
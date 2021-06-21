import { AxiosResponse } from "axios";
import { Api } from "./api";
import { Channel } from "./types";

type ChannelResponse = {
	kind: string,
	channels: Channel[] | [] | null
	errorMessage: any
};

export class ChannelsApi extends Api {
	async get_channels(): Promise<ChannelResponse> {
		try {
			const response: AxiosResponse<any> = await this.axios.get('/api/v1.0/users/current_user/channels')

			return {
				kind: "ok",
				channels: response.data,
				errorMessage: null
			}
		} catch(err) {
			return { 
				kind: "bad-data", 
				channels: null, 
				errorMessage: err
			}
		}
	}

	async get_yt_channels(): Promise<any> {

		try {
			const response: AxiosResponse<any> = await this.axios.get('/api/v1.0/users/current_user/yt-channels')

			return {
				kind: "ok",
				channels: response.data,
				errorMessage: null
			}
		} catch(err) {
			return { 
				kind: "bad-data", 
				channels: null, 
				errorMessage: err
			}
		}
	}
}
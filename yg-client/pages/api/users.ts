import { AxiosResponse } from "axios";
import { Api } from "./api";
import { User } from "./types";

export type GetUserResult = {
	kind: string, 
	user: User | null, 
	errorMessage: any
}

export class UsersApi extends Api {
	async currentUser(): Promise<GetUserResult> {
		try {
			const response: AxiosResponse<any> = await this.axios.get('/api/v1.0/users/current_user')

			return {kind: "ok", user: response.data, errorMessage: null}
		} catch(err) {
			return { kind: "bad-data", user: null, errorMessage: err}
		}
	}
}
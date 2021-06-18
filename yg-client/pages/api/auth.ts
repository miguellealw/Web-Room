import { Api } from './api'
import { User } from './types';
import {AxiosResponse, ResponseType} from 'axios'

type AuthResponse = {
	kind: "ok",
	user: User
};

export class AuthApi extends Api {
	async login(username: string, password: string): Promise<AuthResponse> {
		// console.log("LOGIN", username, password)
		try {
			const response: AxiosResponse<any> = await this.axios.post(
				'/auth/v1.0/login', 
				{
					username, 
					password
				}
			)

			// console.log("AUTH RESPONSE", response)

			return {
				kind: "ok",
				user: response.data
			}
		} catch(err) {
			console.log("AUTH error", err)
			return { kind: "bad-data", message: err}
		}
	}

	async logout(): Promise<any> {
		const response: AxiosResponse<any> = await this.axios.get('/auth/v1.0/logout')

		return {
			kind: "ok",
			flash: response.data
		}
	}
}
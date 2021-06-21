import { Api } from './api'
import { User } from './types';
import { AxiosResponse } from 'axios'

type AuthResponse = {
	kind: string,
	user?: User,
	errorMessage: any
};

export class AuthApi extends Api {
	async login(username: string, password: string): Promise<AuthResponse> {
		try {
			const response: AxiosResponse<any> = await this.axios.post(
				'/auth/v1.0/login', 
				{
					username, 
					password
				}
			)

			return {
				kind: "ok",
				user: response.data,
				errorMessage: null
			}
		} catch(err) {
			return { 
				kind: "bad-data", 
				errorMessage: err
			}
		}
	}

	async register(username: string, email: string, password: string, confirmPassword: string): Promise<AuthResponse> {
		try {
			const response: AxiosResponse<any> = await this.axios.post(
				'/auth/v1.0/register', 
				{
					username, 
					email,
					password,
					confirm_password: confirmPassword
				}
			)

			return {
				kind: "ok",
				user: response.data,
				errorMessage: null
			}
		} catch(err) {
			return { kind: "bad-data", errorMessage: err.response.data.error,}
		}
	}


	async logout(): Promise<any> {
		try {

			const response: AxiosResponse<any> = await this.axios.get('/auth/v1.0/logout')

			return {
				kind: "ok",
				flash: response.data
			}
		} catch(err) {
			return {
				kind: "bad-data",
				errorMessage: "LOGOUT FAILED"
			}
		}
	}
}
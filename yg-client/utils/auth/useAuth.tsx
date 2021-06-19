import { User } from '../../pages/api/types';
import { UsersApi } from '../../pages/api/users'

type AuthHook = {
	isLoggedIn: boolean;
	currentUser: User | null
	// currentUser: any
}

// type return = () => AuthHook

export const useAuth: Promise<AuthHook> = async () => {
// export const useAuth  = async () => {

	try {

		const api = new UsersApi();
		api.setup();
		const response = await api.currentUser();

		if(response.kind !== "ok") {
			return {
				isLoggedIn: false,
				currentUser: null
			}
		} 
		
		return {
			isLoggedIn: true,
			currentUser: response.user
		}

	} catch(err) {
		return {
			isLoggedIn: false,
			currentUser: null
		}
	}
}
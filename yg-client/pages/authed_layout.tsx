import Link from 'next/link'
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { useAuth } from "../utils/auth/useAuth"
import useUser from '../utils/auth/useUser'
import { AuthApi } from './api/auth'


const AuthedLayout : FC = ({ children }) => {
	// const {isLoading, user, isLoggedIn, fetchCurrentUser} = useAuth()

	const {mutateUser} = useUser()
	const router = useRouter()
	// const {user, isLoading} = useUser({
	// 	redirectTo: '/login'
	// })

	const handleLogout = async () => {
		const api = new AuthApi();
		api.setup();
		const response = await api.logout()
		mutateUser()

		router.replace('/')
	}

	// if(isLoading) return <div>LOADING AUTHED LAYOUT....</div>

	return (
		<div>
			<nav>
				<ul>
					<li><Link href="/categories">Categories</Link></li>
					<li><Link href="/channels">Subscriptions</Link></li>
					<li><button onClick={handleLogout}>Logout</button></li>
				</ul>
			</nav>
			{children}
		</div>
	)
}


export async function getServerSideProps(context) {

}

export default AuthedLayout
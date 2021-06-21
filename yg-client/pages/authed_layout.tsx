import Link from 'next/link'
import { useRouter } from "next/router"
import { FC } from "react"
import ReactTooltip from 'react-tooltip'

import useUser from '../utils/auth/useUser'
import { AuthApi } from './api/auth'



const AuthedLayout : FC = ({ children }) => {
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
		<div className="w-1/3 m-auto">
			<nav className="h-screen bg-gray-800 w-20 text-white flex justify-center items-center fixed left-0">
				<ul>
					<li className="my-10">
						<Link href="/categories" passHref>
							<a data-tip="Your Categories">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
	</svg>
								<ReactTooltip effect="solid"/>
							</a>
						</Link>
					</li>
					<li className="my-10">
						<Link href="/channels">
							<a data-tip="Your Subscriptions">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
</svg>
								<ReactTooltip effect="solid"/>
							</a>
						</Link>
					</li>
					<li className="absolute bottom-2">
						<button data-tip="Log Out" onClick={handleLogout}>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
							<ReactTooltip effect="solid"/>
						</button>
					</li>
				</ul>
			</nav>
			{children}
		</div>
	)
}


export default AuthedLayout
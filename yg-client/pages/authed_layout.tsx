import Link from 'next/link'
import { useRouter } from "next/router"
import { FC } from "react"
import ReactTooltip from 'react-tooltip'
import { ViewGridIcon, CollectionIcon, LogoutIcon } from '@heroicons/react/outline'

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
								<ViewGridIcon className="h-5 w-5"/>
								<ReactTooltip effect="solid"/>
							</a>
						</Link>
					</li>
					<li className="my-10">
						<Link href="/channels">
							<a data-tip="Your Subscriptions">
								<CollectionIcon className="h-5 w-5"/>
								<ReactTooltip effect="solid"/>
							</a>
						</Link>
					</li>
					<li className="absolute bottom-5">
						<button data-tip="Log Out" onClick={handleLogout}>
							<LogoutIcon className="h-5 w-5"/>
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
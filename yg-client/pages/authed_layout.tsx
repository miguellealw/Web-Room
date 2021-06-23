import Link from 'next/link'
import { useRouter } from "next/router"
import { FC } from "react"
import ReactTooltip from 'react-tooltip'
import { ViewGridIcon, CollectionIcon, LogoutIcon } from '@heroicons/react/outline'

import useUser from '../utils/auth/useUser'
import { AuthApi } from './api/auth'
import DashboardNavigation from '../components/DashboardNavigation'



const AuthedLayout : FC = ({ children, tw_className = "", ...props }) => {
	const {user, isLoading, isLoggedOut = true} = useUser({
		redirectTo: '/login',
	})

	if(isLoading) {
		return <div>Dashboard Loading...</div>
	}

	return (
		<div className={`${tw_className === "" ? 'w-1/3 m-auto' : tw_className}`} {...props}>
			<DashboardNavigation />			
			{children}
		</div>
	)
}


export default AuthedLayout
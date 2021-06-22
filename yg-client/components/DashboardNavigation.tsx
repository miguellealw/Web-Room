import { CollectionIcon, LogoutIcon, ViewGridIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ReactTooltip from "react-tooltip"
import { AuthApi } from '../pages/api/auth'
import { CategoryApi } from "../pages/api/categories"
import { Category } from "../pages/api/types"
import useUser from "../utils/auth/useUser"


const DashboardNavigation = () => {
	const {mutateUser} = useUser()
	const router = useRouter()
	const [categories, setCategories] = useState<Category[] | [] | null>(null);

	const handleLogout = async () => {
		const api = new AuthApi();
		api.setup();
		const response = await api.logout()
		router.replace('/')
		mutateUser()
	}



	useEffect(() => {
		let mounted = true;
		async function fetchCategories() {
			try {
				const api = new CategoryApi();
				api.setup();
				const res = await api.getUserCategories();

				if(res.categories && mounted) {
					// only update state if compponent is mounted
					setCategories([...res.categories]);
				}
			} catch (err) {
				// TODO: handle this properly
				console.log("CATEGORIES FETCH ERROR", err)
			}
		}

		// if(!isLoggedOut) {
			fetchCategories()
		// }

		return () => {
			mounted = false
		}
	}, [])

	// setCategories([])

	return (
		<nav className="h-screen w-1/12 bg-gray-800 text-white flex flex-col items-center fixed left-0">
			<ul className="w-full">
				<li className="hover:bg-gray-700 w-full">
					<Link href="/categories" passHref>
						<a data-tip="Your Categories" className="flex items-center w-full h-full py-3 px-3">
							<ViewGridIcon className="h-5 w-5"/>
							<span className="ml-2">Categories</span>	
							{/* <ReactTooltip effect="solid"/> */}
						</a>
					</Link>
				</li>
				<li className="hover:bg-gray-700 w-full">
					<Link href="/channels">
						<a data-tip="Your Subscriptions" className="flex items-center w-full h-full py-3 px-3">
							<CollectionIcon className="h-5 w-5"/>
							<span className="ml-2">Subscriptions</span>	
							{/* <ReactTooltip effect="solid"/> */}
						</a>
					</Link>
				</li>
			</ul>

			{/* Categories Section */}
			<div className="border-t-2 border-b-2 h-full border-gray-700 w-full flex flex-col">
				<span className="mt-3 ml-6 font-medium text-gray-400">Your Categories</span>
				<ul className="mt-3">
					{ categories?.length === 0 
						? <span>No categories available</span> :
						categories?.map((category, index) => (
							<li key={index} className="pl-6 py-2 hover:bg-gray-700">{category.name}</li>
						))
					}
				</ul>
			</div>

			<button data-tip="Log Out" onClick={handleLogout} className="flex items-center relative mb-5 mt-5">
				<LogoutIcon className="h-5 w-5"/>
				<span className="ml-2">Log Out</span>	
				{/* <ReactTooltip effect="solid"/> */}
			</button>
		</nav>
	)
}

export default DashboardNavigation
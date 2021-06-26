import { CollectionIcon, FolderIcon, FolderOpenIcon, LogoutIcon, ViewGridIcon, ViewListIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ReactTooltip from "react-tooltip"
import useSWR from "swr"
import { AuthApi } from '../pages/api/auth'
import { CategoryApi } from "../pages/api/categories"
import { Category } from "../pages/api/types"
import useUser from "../utils/auth/useUser"
import Logo from "./Logo"


const DashboardNavigation = () => {
	const {mutateUser} = useUser()
	const router = useRouter()

	const api = new CategoryApi();
	api.setup();
  const fetcher = () => api.getUserCategories()
	const {data, error} = useSWR(`/api/v1.0/users/current_user/categories`, fetcher)

	console.log("NAVIGATION RERENDERED")

	if(error) return <div>Error loading page...</div>

	if(!data) {
		return (
			<div>Loading categories...</div>
		)
	}

	const handleLogout = async () => {
		const api = new AuthApi();
		api.setup();
		const response = await api.logout()
		router.replace('/')
		mutateUser()
	}

	return (
		<nav className="h-screen w-1/12 bg-gray-800 text-white flex flex-col items-center fixed left-0">
			{/* Logo */}
			<div className="w-full  my-3 flex items-center py-2 px-3">
				<Logo className="mr-2 w-6 h-6"/>
				<h1>YouTube Box</h1>
			</div>

			{/* Subs and Categories */}
			<ul className="w-full">
				<li className="hover:bg-gray-700 w-full">
					<Link href="/categories" passHref>
						<a data-tip="Your Categories" className="flex items-center w-full h-full p-3">
							<FolderIcon className="h-5 w-5"/>
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
					{ data.categories?.length === 0 
						? <span>No categories available</span> :
						data.categories?.map((category, index) => (
							<Link href={`/categories/${category.id}`} passHref key={category.id}>
								<a>
									<li className="pl-3 py-2 hover:bg-gray-700 flex">
										<FolderOpenIcon className="w-5 h-5 mr-2" />
										{category.name}
									</li>
								</a>
							</Link>
						))
					}
				</ul>
			</div>

			{/* Log Out */}
			<button data-tip="Log Out" onClick={handleLogout} className="flex items-center relative mb-5 mt-5">
				<LogoutIcon className="h-5 w-5"/>
				<span className="ml-2">Log Out</span>	
				{/* <ReactTooltip effect="solid"/> */}
			</button>
		</nav>
	)
}

export default DashboardNavigation
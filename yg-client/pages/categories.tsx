import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Category, Channel } from "./api/types";
import { useRouter } from 'next/router'
import AuthedLayout from './authed_layout'
import useUser from "../utils/auth/useUser";
import SubscriptionListItem from "../components/SubscriptionListItem";
import { CategoryApi } from "./api/categories";

function Categories() {
	const [categories, setCategories] = useState<Category[] | [] | null>(null);
	const router = useRouter()
	const {user, isLoading, isLoggedOut = true} = useUser({
		redirectTo: '/login',
	})


	useEffect(() => {
		let mounted = true;
		async function fetchCategories() {
			try {
				const api = new CategoryApi();
				api.setup();
				// const res = await api.get_channels();
				const res = await api.getUserCategories();

				// console.log("RESE", res)

				if(res.categories && mounted) {
					// only update state if compponent is mounted
					// setChannels([...res.channels]);
					setCategories([...res.categories]);
				}
			} catch (err) {
				// TODO: handle this properly
				console.log("CATEGORIES FETCH ERROR", err)
			}
		}

		if(!isLoggedOut) {
			fetchCategories()
		}

		return () => {
			mounted = false
		}
	}, [isLoggedOut])

	if(isLoading) {
		return <div>Loading Dashboard...</div>
	}


	return (
		<AuthedLayout>
			<div className="py-10">
				{
					!categories ? (
						<div>Loading your Categories...</div>
					) : (
						<>
							<h1 className="pb-10 text-5xl font-bold">Your Categories</h1>
							<ul>
								{/* {channels.map((channel, index) => (
									<li key={index}><strong>{channel.name}</strong> - {channel.yt_data.snippet.description}</li>
								))} */}
								{categories.map((category, index) => (
									<div key={index}>{category.name}</div>
								))}
							</ul>
						</>
					)

				}
			</div>
		</AuthedLayout>
	)
}



export default Categories

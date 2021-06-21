import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Channel } from "./api/types";
import Link from 'next/link'
import { AuthApi } from "./api/auth";
import { useRouter } from 'next/router'
import { useAuth } from '../utils/auth/useAuth'
import AuthedLayout from './authed_layout'
import useUser from "../utils/auth/useUser";

function Channels() {
	const [channels, setChannels] = useState<Channel[] | [] | null>(null);
	const router = useRouter()
	const {user, isLoading, isLoggedOut = true} = useUser({
		redirectTo: '/login',
	})


	useEffect(() => {
		let mounted = true;
		async function fetchChannels() {
			try {
				const api = new ChannelsApi();
				api.setup();
				const res = await api.get_channels();

				if(res.channels && mounted) {
					// only update state if compponent is mounted
					setChannels([...res.channels]);
				}
			} catch (err) {
				// TODO: handle this properly
				console.log("CHANNELS FETCH ERROR", err)
			}
		}

		if(!isLoggedOut) {
			fetchChannels()
		}

		return () => {
			mounted = false
		}
	}, [isLoggedOut])

	// console.log("ISLOADING", isLoading)

	if(isLoading) {
		return <div>Loading Dashboard...</div>
	}


	return (
		<AuthedLayout>
			<div>
				{
					!channels ? (
						<div>Loading your Subscriptions...</div>
					) : (
						<>
							<h1>Your Subscriptions</h1>
							<ul>
								{channels.map((channel, index) => (
									<li key={index}><strong>{channel.name}</strong> - {channel.yt_data.snippet.description}</li>
								))}
							</ul>
						</>
					)

				}
			</div>
		</AuthedLayout>
	)
}



export default Channels

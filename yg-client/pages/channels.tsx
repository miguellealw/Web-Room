import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Channel } from "./api/types";
import Link from 'next/link'
import { AuthApi } from "./api/auth";
import { useRouter } from 'next/router'
import AuthedLayout from './authed_layout'
import useUser from "../utils/auth/useUser";
import SubscriptionListItem from "../components/SubscriptionListItem";

function Channels() {
	const [channels, setChannels] = useState<Channel[] | [] | null>(null);
	const router = useRouter()
	const {isLoggedOut = true} = useUser()

	useEffect(() => {
		let mounted = true;
		async function fetchChannels() {
			try {
				const api = new ChannelsApi();
				api.setup();
				// const res = await api.get_channels();
				const res = await api.get_yt_channels();

				console.log("RESE", res)

				if(res.channels && mounted) {
					// only update state if compponent is mounted
					// setChannels([...res.channels]);
					setChannels([...res.channels.channels.items]);
				}
			} catch (err) {
				// TODO: handle this properly
				console.log("CHANNELS FETCH ERROR", err)
			}
		}

		// if(!isLoggedOut) {
			fetchChannels()
		// }

		return () => {
			mounted = false
		}
	}, [])

	return (
		<AuthedLayout>
			<div className="py-10">
				{
					!channels ? (
						<div>Loading your Subscriptions...</div>
					) : (
						<>
							<h1 className="pb-10 text-5xl font-bold">Your Subscriptions</h1>
							<ul className="grid grid-cols-3 gap-3">
								{channels.map((channel, index) => (

									<SubscriptionListItem
										key={index} 
										name={channel.snippet.title} 
										description={channel.snippet.description}
										thumbnail={channel.snippet.thumbnails.default}
										channelId={channel.snippet.resourceId.channelId}
									/>
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

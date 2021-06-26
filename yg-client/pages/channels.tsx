import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Channel } from "./api/types";
import Link from 'next/link'
import { AuthApi } from "./api/auth";
import { useRouter } from 'next/router'
import AuthedLayout from './layouts/authed_layout'
import useUser from "../utils/auth/useUser";
import SubscriptionListItem from "../components/SubscriptionListItem";
import useChannels from "../utils/useChannels";

function Channels() {
	const {data : channels, error, isLoading} = useChannels()

	if(error) {
		return <div>Error loading your subscriptions...</div>
	}

	if(isLoading) {
		return <div>Loading your subscriptions...</div>
	}

	return (
		<AuthedLayout>
			<div className="py-10">
				{
					<>
						<h1 className="pb-10 text-5xl font-bold">Your Subscriptions</h1>
						<ul className="grid grid-cols-3 gap-3">
							{channels.map((channel, index : number) => (
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
				}
			</div>
		</AuthedLayout>
	)
}



export default Channels

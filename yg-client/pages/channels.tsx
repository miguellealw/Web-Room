import React, { useEffect, useState } from "react";
import AuthedLayout from './layouts/authed_layout'
import SubscriptionListItem from "../components/SubscriptionListItem";
import useChannels from "../utils/useChannels";
import LoadingText from "../components/LoadingText";
import ChannelsSkeleton from '../components/skeletons/ChannelsSkeleton'

function Channels() {
	const {data : channels, error, isLoading} = useChannels()

	if(error) {
		return <div>Error loading your subscriptions...</div>
	}

	return (
		<AuthedLayout>
			<div className="py-10">
				<h1 className="pb-10 text-5xl font-bold">Your Subscriptions</h1>
				<ChannelsSkeleton ready={!isLoading}>
					<ul className="grid grid-cols-3 gap-3">
						{channels?.map((channel, index : number) => (
							<SubscriptionListItem
								key={index} 
								name={channel.snippet.title} 
								description={channel.snippet.description}
								thumbnail={channel.snippet.thumbnails.default}
								channelId={channel.snippet.resourceId.channelId}
							/>
						))}
					</ul>
				</ChannelsSkeleton>
			</div>
		</AuthedLayout>
	)
}



export default Channels

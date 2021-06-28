import React, { useEffect, useState } from "react";
import AuthedLayout from "../layouts/authed_layout";
import SubscriptionListItem from "./SubscriptionListItem";
import useChannels from "../../utils/useChannels";
import LoadingText from "../../components/LoadingText";
import ChannelsSkeleton from "../../components/skeletons/ChannelsSkeleton";

function Channels() {
  const { data: channels, error, isLoading } = useChannels();

  if (error) {
    return <div>Error loading your subscriptions...</div>;
  }

  return (
    <AuthedLayout>
      <div className="py-10">
        <h1 className="pb-7 text-2xl lg:text-5xl font-bold">
          Your Subscriptions
        </h1>
        <label
          htmlFor="searchChannel"
          className="font-bold text-gray-400 block mb-1 text-sm"
        >
          Search
        </label>
        <input
          type="text"
          id="searchChannel"
          className="w-full p-1 rounded-md mb-10"
          placeholder="Search channel"
        />
        <ChannelsSkeleton ready={!isLoading}>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {channels?.map((channel: any, index: number) => (
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
  );
}

export default Channels;

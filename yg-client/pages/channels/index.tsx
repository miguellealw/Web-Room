import React, { useEffect, useState } from "react";
import AuthedLayout from "../layouts/authed_layout";
import SubscriptionListItem from "./SubscriptionListItem";
import useChannels from "../../shared-hooks/useChannels";
import LoadingText from "../../components/LoadingText";
import ChannelsSkeleton from "../../components/skeletons/ChannelsSkeleton";
import { ChannelResponse, ChannelsApi } from "../api/channels";
import InfiniteScroll from "react-infinite-scroll-component";

function Channels() {
  const {
    data: channels,
    nextPageToken,
    pageInfo,
    error,
    isLoading,
    mutateChannels,
  } = useChannels();

  console.log("PAGE INFO", pageInfo);

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
          onChange={(e) => {
            // TODO: use search api and pass channel name to `q`, and type="channel" and
            // get results with "id" > "kind" > "youtube#channel"
            // TODO: figure out how to only get channels user is subbed to
          }}
        />
        <ChannelsSkeleton ready={!isLoading}>
          <ul>
            <InfiniteScroll
              dataLength={channels?.length}
              next={async () => {
                // make api call w/ next page token
                const api = new ChannelsApi();
                api.setup();
                const res = await api.get_yt_channels(nextPageToken);

                // update local data / cache with mutation
                mutateChannels((data: ChannelResponse) => {
                  if (!data || !data.channels) return;

                  return {
                    ...data,
                    channels: {
                      ...data.channels,
                      items: [...data.channels.items, ...res.channels.items],
                      nextPageToken: res.channels.nextPageToken,
                      prevPageToken: res.channels.prevPageToken,
                    },
                  };
                }, false);
              }}
              loader={<div>Loading more subs...</div>}
              hasMore={channels?.length < pageInfo.totalResults}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {channels?.map((channel: any, index: number) => (
                <SubscriptionListItem
                  key={index}
                  name={channel?.snippet.title}
                  description={channel?.snippet.description}
                  thumbnail={channel?.snippet.thumbnails.default}
                  channelId={channel?.snippet.resourceId.channelId}
                />
              ))}
            </InfiniteScroll>
          </ul>
        </ChannelsSkeleton>
      </div>
    </AuthedLayout>
  );
}

export default Channels;

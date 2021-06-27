import Image from "next/image";
import { numberWithCommas } from "../utils/helpers";
import { ExternalLinkIcon } from "@heroicons/react/outline";

const CategorySubListItem = ({ channel }) => (
  <li className="py-5 bg-gray-100 mb-3 rounded-lg flex items-center pl-4">
    <div className="rounded-full w-14 h-14 bg-gray-300 overflow-hidden">
      <Image
        src={channel.yt_data.snippet.thumbnails.default.url}
        alt={`${channel.name}'s thumbnail`}
        className="w-full h-full object-cover object-center"
        width={200}
        height={200}
      />
    </div>
    <div className="ml-3">
      <div className="font-bold text-lg">{channel.name}</div>

      {!channel.yt_data.statistics.hiddenSubscriberCount ? (
        <div className="text-sm">
          {numberWithCommas(channel.yt_data.statistics.subscriberCount)}{" "}
          Subscribers
        </div>
      ) : (
        <div>channels subscriber count is not public</div>
      )}

      <a
        href={`https://www.youtube.com/channel/${channel.yt_channel_id}`}
        // target="_blank"
        className="text-xs text-gray-400 hover:underline flex"
      >
        Go to Channel
        <ExternalLinkIcon className="w-4 h-4 ml-1" />
      </a>
    </div>
  </li>
);

export default CategorySubListItem;

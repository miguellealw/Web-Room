import Image from "next/image";
import { numberWithCommas } from "../../utils/helpers";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { Channel } from "../channels";
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline";
import { useCallback, useState } from "react";
import Dropdown from "../../components/Dropdown";
import useOuterClick from "../../shared-hooks/useOnOuterClick";

type CategorySubListItemProps = {
  channel: Channel;
  categoryId: number | undefined;
  removeChannelFromCategory: any;
};

export const MobileCategorySubListItem: React.FC<CategorySubListItemProps> = ({
  channel,
}) => {
  return (
    <li className="mr-4 rounded-lg relative">
      {!channel.yt_data ? (
        <div className="rounded-full w-14 h-14 bg-gray-500 overflow-hidden"></div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full w-14 h-14 bg-gray-300 overflow-hidden">
            <Image
              src={channel.yt_data.snippet.thumbnails.default.url}
              alt={`${channel.name}'s thumbnail`}
              className="w-full h-full object-cover object-center"
              width={200}
              height={200}
            />
          </div>
          <span className="text-sm w-16 text-center block truncate text-gray-500">
            {channel.name}
          </span>
        </div>
      )}
    </li>
  );
};

const CategorySubListItem: React.FC<CategorySubListItemProps> = ({
  channel,
  categoryId,
  removeChannelFromCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const innerRef = useOuterClick(() => setIsDropdownOpen(false))

  const handleRemoveChannelFromCategory = useCallback(async () => {
    removeChannelFromCategory(channel.name, channel.yt_channel_id);
  }, [channel, removeChannelFromCategory]);


  return (
    <li className="py-5 bg-gray-100 mb-3 rounded-lg flex items-center pl-4 relative" ref={innerRef}>
      {/* Thumbnail */}
      {!channel.yt_data ? (
        <div className="rounded-full w-14 h-14 bg-gray-500 overflow-hidden"></div>
      ) : (
        <div className="flex-shrink-0 rounded-full w-14 h-14 bg-gray-300 overflow-hidden">
          <Image
            src={channel.yt_data.snippet.thumbnails.default.url}
            alt={`${channel.name}'s thumbnail`}
            className="w-full h-full object-cover object-center"
            width={200}
            height={200}
          />
        </div>
      )}

      {/* Data */}
      <div className="ml-3">
        <DotsVerticalIcon
          // className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer"
          className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer hover:bg-gray-200 hover:text-black rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        />
        {/* Name */}
        <div className="font-bold text-lg w-48 truncate" title={channel.name}>
          {channel.name}
        </div>

        {/* Subscribers */}
        {channel.yt_data &&
        !channel.yt_data.statistics.hiddenSubscriberCount ? (
          <div className="text-sm text-gray-500">
            {numberWithCommas(channel.yt_data.statistics.subscriberCount)}{" "}
            Subscribers
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            Subscriber Count is not Public
          </div>
        )}

        {/* Dropdown */}
        <Dropdown isOpen={isDropdownOpen} tw_className="w-44">
          <Dropdown.Item
            handleClick={(e) => {
              e.preventDefault();
              handleRemoveChannelFromCategory();
              setIsDropdownOpen(false);
            }}
          >
            <span className="flex items-center">
              <XIcon className="w-4 h-4 mr-1" />
              Remove from Category
            </span>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href={`https://www.youtube.com/channel/${channel.yt_channel_id}`}
              // target="_blank"
              className="flex"
            >
              <ExternalLinkIcon className="w-4 h-4 mr-1" />
              Go to Channel
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </li>
  );
};

export default CategorySubListItem;

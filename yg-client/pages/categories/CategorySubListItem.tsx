import Image from "next/image";
import { numberWithCommas } from "../../utils/helpers";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { Channel } from "../api/types";
import { DotsVerticalIcon, XIcon } from "@heroicons/react/outline";
import { useCallback, useState } from "react";

type CategoryDropdownProps = {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  handleRemoveChannelFromCategory: () => void;
};

const Dropdown: React.FC<CategoryDropdownProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
  handleRemoveChannelFromCategory,
}) => {
  return (
    <>
      {isDropdownOpen && (
        <ul className="bg-white w-max absolute text-sm font-normal top-8 right-3 rounded-sm shadow-xl">
          <li
            className="py-2 px-4 hover:bg-gray-100 border border-gray-300 rounded-md cursor-pointer flex"
            onClick={(e) => {
              e.preventDefault();
              handleRemoveChannelFromCategory();
              setIsDropdownOpen(false);
            }}
          >
            <XIcon className="w-5 h-5 mr-2" />
            Remove from Category
          </li>
        </ul>
      )}
    </>
  );
};

type CategorySubListItemProps = {
  channel: Channel;
  categoryId: number | undefined;
  removeChannelFromCategory: any;
};

export const MobileCategorySubListItem: React.FC<CategorySubListItemProps> = ({
  channel,
}) => {
  return (
    <li className="mr-4 mb-3 bg-gray-100 rounded-lg relative">
      {!channel.yt_data ? (
        <div className="rounded-full w-14 h-14 bg-gray-500 overflow-hidden"></div>
      ) : (
        <div>
          <div className="rounded-full w-14 h-14 bg-gray-300 overflow-hidden">
            <Image
              src={channel.yt_data.snippet.thumbnails.default.url}
              alt={`${channel.name}'s thumbnail`}
              className="w-full h-full object-cover object-center"
              width={200}
              height={200}
            />
          </div>
          <span className="text-sm w-16 block truncate text-gray-500">{channel.name}</span>
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

  const handleRemoveChannelFromCategory = useCallback(async () => {
    removeChannelFromCategory(channel.name, channel.yt_channel_id);
  }, [channel, removeChannelFromCategory]);

  return (
    <li className="py-5 bg-gray-100 mb-3 rounded-lg flex items-center pl-4 relative overflow-hidden">
      <Dropdown
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleRemoveChannelFromCategory={handleRemoveChannelFromCategory}
      />

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
          className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        />
        <div className="font-bold text-lg max-w-48 truncate">{channel.name}</div>

        {channel.yt_data &&
        !channel.yt_data.statistics.hiddenSubscriberCount ? (
          <div className="text-sm">
            {numberWithCommas(channel.yt_data.statistics.subscriberCount)}{" "}
            Subscribers
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            Subscriber Count is not Public
          </div>
        )}

        <a
          href={`https://www.youtube.com/channel/${channel.yt_channel_id}`}
          // target="_blank"
          className="text-xs text-gray-400 hover:underline flex mt-1"
        >
          Go to Channel
          <ExternalLinkIcon className="w-4 h-4 ml-1" />
        </a>
      </div>
    </li>
  );
};

export default CategorySubListItem;

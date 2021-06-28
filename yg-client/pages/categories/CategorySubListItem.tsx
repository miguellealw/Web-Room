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
            className="border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex"
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
    <li className="py-5 bg-gray-100 mb-3 rounded-lg flex items-center pl-4 relative">
      <Dropdown
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleRemoveChannelFromCategory={handleRemoveChannelFromCategory}
      />
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
        <DotsVerticalIcon
          className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        />
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
};

export default CategorySubListItem;

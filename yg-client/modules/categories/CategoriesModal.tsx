import Modal from "../../components/Modal";
import useCategoriesStore from "../../stores/useCategoriesStore";
import {
  XIcon,
  CheckIcon,
  PlusSmIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { Category } from "./";
import useCategory from "../../shared-hooks/useCategory";
import useFetchChannel from "../../shared-hooks/useFetchChannel";
import { Channel } from "../channels";
import useOnHover from "../../shared-hooks/useOnHover";

type ListItemProps = {
  c: Category;
  channel: Channel;
  mutate: any;
  isSelected: boolean;
};

const ListItem: React.FC<ListItemProps> = ({
  c,
  channel,
  mutate,
  isSelected: isChannelInCategory = false,
}) => {
  const [isSelected, setIsSelected] = useState(isChannelInCategory);
  const { addChannelToCategory, removeChannelFromCategory } = useCategory(c.id);
  const { isHovering, handleMouseOut, handleMouseOver } = useOnHover();

  useEffect(() => {
    setIsSelected(isSelected);
  }, [isSelected]);

  const handleClick = useCallback(async () => {
    // Set current category so store knows what category to add channel to
    setIsSelected(!isSelected);

    if (!isSelected) {
      await addChannelToCategory(channel.name, channel.yt_channel_id);
      channel.categories.push(c.id);
      mutate();
    } else {
      await removeChannelFromCategory(channel.name, channel.yt_channel_id);
      channel.categories = channel.categories.filter((cId) => cId !== c.id);
      mutate();
    }
  }, [
    addChannelToCategory,
    removeChannelFromCategory,
    c.id,
    mutate,
    channel,
    isSelected,
  ]);

  return (
    <li
      className={`bg-gray-100 cursor-pointer text-sm mb-3 px-5 py-5 rounded-md hover:bg-gray-200 ${
        isSelected &&
        "bg-gray-800 hover:bg-gray-700 text-white flex justify-between"
      }`}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span>{c.name}</span>

      {/* Icon */}
      {isSelected && (
        <span
          className={`text-sm uppercase font-bold flex items-center ${
            isHovering ? "text-red-500" : "text-green-500"
          }`}
          style={{
            fontSize: ".7rem",
          }}
        >
          {isHovering ? (
            <>
              <XCircleIcon className="w-4 h-4 mr-1" /> Remove
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-4 h-4 mr-1" /> Added
            </>
          )}
        </span>
      )}
    </li>
  );
};

type CategoriesModalProps = {
  selectedChannel: { name: string; channelId: string };
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  selectedChannel,
  isOpen,
  setIsModalOpen,
}) => {
  const categories = useCategoriesStore((state) => state.categories);

  // fetch channel and return categories the channel is part of
  // will return null if channel is not part of category yet.
  const {
    data: channelData,
    isLoading: isChannelDataLoading,
    mutateChannel,
  } = useFetchChannel(selectedChannel.channelId);

  // check if selected channel is in category list item
  const channelExistsInCategory = (
    currentCategoryId: number,
    channelCategories: number[]
  ) => channelCategories.some((categoryId) => categoryId === currentCategoryId);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsModalOpen(false)}
      tw_className="w-11/12 lg:w-1/4 h-30 bg-gray-100"
    >
      <div className="h-full flex items-center justify-center">
        <div className="w-11/12 lg:w-5/6">
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsModalOpen(false)}
            title="Close Categories Modal"
          >
            <XIcon className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>

          <h2 className="font-bold text-base lg:text-lg my-5">
            Add <span className="text-red-500">{selectedChannel.name} </span>
            to...
          </h2>

          {/* Categories List */}
          <ul
            className="bg-white p-5 lg:p-10 rounded-md"
            style={{
              height: "30rem",
              overflowY: "scroll",
            }}
          >
            {categories.length === 0 ? (
              <div className="text-sm text-gray-500 italic">
                You have no categories...
              </div>
            ) : isChannelDataLoading ? (
              <div>Loading channel data...</div>
            ) : (
              categories.map((c) => {
                // check if selectedChannel.channelId is in c.channels
                const isChannelInCategory = channelData?.categories
                  ? channelExistsInCategory(
                      c.id as number,
                      channelData.categories
                    )
                  : false;

                return (
                  <ListItem
                    key={c.id}
                    c={c as Category}
                    isSelected={isChannelInCategory}
                    mutate={mutateChannel}
                    // If channel data is null, it means channel is not part of category, therefore it is not stored
                    // in DB, so pass dummy channel data for local state
                    channel={
                      channelData || {
                        name: selectedChannel.name,
                        yt_channel_id: selectedChannel.channelId,
                        categories: [],
                      }
                    }
                  />
                );
              })
            )}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row mt-7">
            <button className="w-full py-2 lg:py-3 border-2 border-gray-400 text-gray-400 hover:text-white hover:bg-gray-400 text-sm rounded-md font-bold flex justify-center items-center">
              <PlusSmIcon className="w-5 h-5 mr-2" />
              Create Category
            </button>
            <button
              className="mt-3 lg:mt-0 lg:ml-3 w-full py-2 lg:py-3 bg-gray-700 hover:bg-gray-600 text-sm rounded-md text-white font-bold flex justify-center items-center"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <CheckIcon className="w-5 h-5 mr-2" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

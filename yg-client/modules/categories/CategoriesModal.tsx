import Modal from "../../components/Modal";
import useCategoriesStore from "../../stores/useCategoriesStore";
import { XIcon } from "@heroicons/react/outline";
import { useCallback } from "react";
import { Category } from "../../pages/api/types";
import { CheckCircleIcon } from "@heroicons/react/solid";

type ListItemProps = {
  c: Category;
  isSelected: boolean;
};

const ListItem: React.FC<ListItemProps> = ({ c, isSelected }) => {
  return (
    <li
      className={`bg-gray-100 cursor-pointer text-sm mb-3 px-5 py-5 rounded-md hover:bg-gray-200 ${
        isSelected &&
        "bg-gray-800 hover:bg-gray-600 text-white flex justify-between"
      }`}
    >
      <span>{c.name}</span>

      {/* Icon */}
      {isSelected && (
        <span
          className="text-green-500 text-sm uppercase font-bold flex items-center"
          style={{
            fontSize: ".7rem",
          }}
        >
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          Added
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

  console.log("CATEGORIES in MODAL", categories);

  const channelExistsInCategory = (channels) => {
    return channels.some(
      (ch) => ch.yt_channel_id === selectedChannel.channelId
    );
  };

  const handleClickOnCategory = useCallback(() => {}, []);

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
            ) : (
              categories.map((c) => {
                // check if selectedChannel.channelId is in c.channels
                const isChannelInCategory = channelExistsInCategory(c.channels);
                return <ListItem key={c.id} c={c} isSelected={isChannelInCategory} />;
              })
            )}
          </ul>
          <div className="flex flex-col lg:flex-row mt-7">
            <button className="w-full py-2 lg:py-3 bg-gray-700 hover:bg-gray-600  text-sm rounded-md text-white font-bold">
              Create Category
            </button>
            <button className="mt-3 lg:mt-0 lg:ml-3 w-full py-2 lg:py-3 bg-red-600 hover:bg-red-500 text-sm rounded-md text-white font-bold">
              Add to Category
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

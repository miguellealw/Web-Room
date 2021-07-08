import Modal from "../../components/Modal";
import useCategoriesStore from "../../stores/useCategoriesStore";
import { XIcon } from "@heroicons/react/outline";

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

          <ul className="bg-white p-5 lg:p-10 rounded-md">
            {categories.length === 0 ? (
              <div className="text-sm text-gray-500 italic">
                You have no categories...
              </div>
            ) : (
              categories.map((c) => (
                <li
                  key={c.id}
                  className="bg-gray-100 cursor-pointer text-sm mb-3 px-5 py-5 rounded-md hover:bg-gray-200"
                >
                  <span>{c.name}</span>
                </li>
              ))
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

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
      width="40rem"
      height="48rem"
      bgColor="#F3F4F6"
    >
      <div className="h-full flex items-center justify-center">
        <div className="w-5/6">
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsModalOpen(false)}
            title="Close Categories Modal"
          >
            <XIcon className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>

          <h2 className="font-bold my-5">
            Add <span className="text-red-500">{selectedChannel.name} </span>
            to...
          </h2>

          <ul className="bg-white p-10 rounded-md">
            {categories.length === 0 ? (
              <div className="text-sm text-gray-500 italic">You have no categories...</div>
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
          <div className="flex mt-7">
            <button className="w-full bg-gray-700 hover:bg-gray-600 py-3 text-sm rounded-md text-white font-bold">
              Create Category
            </button>
            <button className="ml-3 w-full bg-red-600 hover:bg-red-500 py-3 text-sm rounded-md text-white font-bold">
              Add to Category
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

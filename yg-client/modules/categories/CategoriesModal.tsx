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
      // onRequestClose={() => cancel()}
      width="40rem"
      height="48rem"
      bgColor="#F3F4F6"
      onRequestClose={() => setIsModalOpen(false)}
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
            {categories.map((c) => (
              <li
                key={c.id}
                className="bg-gray-100 mb-3 px-8 py-6 rounded-md uppercase font-bold hover:bg-gray-200"
              >
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
          <button className="w-full bg-red-600 hover:bg-red-500 py-3 rounded-md text-white font-bold mt-7">
            Add to Category
          </button>
        </div>
      </div>
    </Modal>
  );
};

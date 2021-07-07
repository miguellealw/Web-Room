import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";

const NewCategoryButton = () => (
  <Link href="/categories/create" passHref>
    <li className="hover:bg-gray-200 hover:text-gray-400 border-dashed border-2 border-gray-300 hover:border-gray-400 text-gray-300 cursor-pointer text-sm h-28 rounded-md flex justify-center items-center uppercase font-bold">
      <PlusIcon className="w-6 h-6 mr-1 lg:mr-2" />
      New Category
    </li>
  </Link>
);

export default NewCategoryButton;

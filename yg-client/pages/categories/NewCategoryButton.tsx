import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";

const NewCategoryButton = () => (
  <Link href="/categories/create" passHref>
    <li className="hover:bg-gray-50 border-2 border-gray-200 text-gray-300 cursor-pointer text-sm lg:text-lg h-28 rounded-md flex justify-center items-center">
      <PlusIcon className="w-6 h-6 mr-2" />
      New Category
    </li>
  </Link>
);

export default NewCategoryButton;

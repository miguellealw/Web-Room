import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

const BackToCategoriesLink = () => (
  <Link href="/categories" passHref>
    <div className="text-sm hidden lg:flex items-center mb-5 lg:mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-52">
      <ArrowNarrowLeftIcon className="w-4 h-4 mr-2" />
      Back to Categories
    </div>
  </Link>
);

export default BackToCategoriesLink;

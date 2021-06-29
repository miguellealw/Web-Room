import { CollectionIcon, FolderIcon } from "@heroicons/react/outline";
import Link from "next/link";

const MobileNavigation = () => {
  return (
    <nav className="w-full h-14 fixed left-0 bottom-0 bg-gray-800 z-10">
      <ul className="flex h-full">
        <li className="w-1/2 h-full text-white">
          <Link href="/categories" passHref>
            <a className="h-full flex flex-col items-center justify-center">
              <FolderIcon className="h-5 w-5" />
              <span className="text-xs">Categories</span>
            </a>
          </Link>
        </li>
        <li className="w-1/2 h-full text-white">
          <Link href="/channels" passHref>
            <a className="h-full flex flex-col items-center justify-center">
              <CollectionIcon className="h-5 w-5" />
              <span className="text-xs">Subscriptions</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;

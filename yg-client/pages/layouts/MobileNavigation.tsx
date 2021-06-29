import { CollectionIcon, FolderIcon } from "@heroicons/react/outline";
import {
  CollectionIcon as CollectionIconSolid,
  FolderIcon as FolderIconSolid,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileNavigation = () => {
  const router = useRouter();
  const isCategories = router.pathname === "/categories";
  const isSubscriptions = router.pathname === "/channels";
  return (
    <nav className="w-full h-14 fixed left-0 bottom-0 bg-white z-10 block lg:hidden shadow-sm border">
      <ul className="flex h-full">
        <li className={`w-1/2 h-full  text-black`}>
          <Link href="/categories" passHref>
            <a className="h-full flex flex-col items-center justify-center">
              {isCategories ? (
                <FolderIconSolid className="h-5 w-5" />
              ) : (
                <FolderIcon className="h-5 w-5" />
              )}
              <span className="text-xs">Categories</span>
            </a>
          </Link>
        </li>
        <li className={`w-1/2 h-full text-black`}>
          <Link href="/channels" passHref>
            <a className="h-full flex flex-col items-center justify-center">
              {isSubscriptions ? (
                <CollectionIconSolid className="h-5 w-5" />
              ) : (
                <CollectionIcon className="h-5 w-5" />
              )}
              <span className="text-xs">Subscriptions</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;

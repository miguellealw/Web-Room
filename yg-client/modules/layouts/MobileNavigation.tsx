import {
  CollectionIcon,
  FolderIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import {
  CollectionIcon as CollectionIconSolid,
  FolderIcon as FolderIconSolid,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthApi } from "../../pages/api/auth";
import useUser from "../../shared-hooks/useUser";

const MobileNavigation = () => {
  const router = useRouter();
  const isCategories = router.pathname === "/categories";
  const isSubscriptions = router.pathname === "/channels";

  // TODO: optimize this to not use useUser
  const { mutateUser } = useUser();

  const handleLogout = async () => {
    mutateUser();
    const api = new AuthApi();
    api.setup();
    await api.logout();
    router.replace("/");
    mutateUser();
  };

  return (
    <nav className="w-full h-14 fixed left-0 bottom-0 bg-white z-10 block lg:hidden shadow-sm border">
      <ul className="flex justify-around h-full">
        <li className={`h-full  text-black`}>
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
        <li className={`h-full text-black`}>
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
        <li className={`h-full text-black`}>
          <button
            data-tip="Log Out"
            onClick={handleLogout}
            // className="flex items-center my-3"
            className="h-full flex flex-col items-center justify-center"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="text-xs">Log Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;

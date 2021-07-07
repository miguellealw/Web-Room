import {
  CollectionIcon,
  FolderIcon,
  FolderOpenIcon,
  LogoutIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import {
  CollectionIcon as CollectionIconSolid,
  FolderIcon as FolderIconSolid,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { AuthApi } from "../../pages/api/auth";
import useUser from "../../shared-hooks/useUser";
import LoadingText from "../../components/LoadingText";
import Logo from "../../components/Logo";
import { useDrop } from "react-dnd";
import { Category } from "../../pages/api/types";
import useCategory from "../../shared-hooks/useCategory";
import React from "react";
import { CategoryResponse } from "../../pages/api/categories";
import LogoType from "../../components/LogoType";

type NavCategoryListItemProps = {
  category: Category;
};

const NavCategoryListItem: React.FC<NavCategoryListItemProps> = ({
  category,
}) => {
  const { addChannelToCategory } = useCategory(category.id);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "SUB_ITEM",
    // what is returned from here will be accessible from end in useDrag
    drop: (channel) => {
      addChannelToCategory(category.id, channel.name, channel.id);
      return { name: `${category.name}`, id: category.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <li key={category.id}>
      <Link href={`/categories/${category.id}`} passHref>
        <a
          ref={drop}
          role={`Category`}
          className={`pl-5 py-2 hover:bg-gray-700 flex items-center ${
            isActive && "bg-gray-700"
          }`}
        >
          <FolderOpenIcon className="w-4 h-4 mr-2" />
          <span className="w-40 truncate">{category.name}</span>
        </a>
      </Link>
    </li>
  );
};

const DashboardNavigation: React.FC<{
  data: CategoryResponse | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  // FIXME: these hooks may have to do with memo not working (keeps rerendering nav)
  const { mutateUser } = useUser();
  const router = useRouter();
  const isCategories = router.pathname === "/categories";
  const isSubscriptions = router.pathname === "/channels";
  // console.log("NAV RENDERS");

  const handleLogout = async () => {
    mutateUser();
    const api = new AuthApi();
    api.setup();
    await api.logout();
    router.replace("/");
    mutateUser();
  };

  return (
    <nav className="h-screen w-56 bg-gray-800 text-white hidden lg:flex flex-col items-center fixed left-0 text-sm tracking-wide">
      {/* Logo */}
      <div className="w-full my-3 flex items-center py-2 px-3">
        <LogoType />
      </div>

      {/* Subs and Categories */}
      <ul className="w-full">
        <li className="hover:bg-gray-700 w-full">
          <Link href="/categories" passHref>
            <a
              data-tip="Your Categories"
              className="flex items-center w-full h-full p-3 pl-5"
            >
              {isCategories ? (
                <FolderIconSolid className="h-4 w-4" />
              ) : (
                <FolderIcon className="h-4 w-4" />
              )}
              <span className="ml-2">Categories</span>
              {/* <ReactTooltip effect="solid"/> */}
            </a>
          </Link>
        </li>
        <li className="hover:bg-gray-700 w-full">
          <Link href="/channels">
            <a
              data-tip="Your Subscriptions"
              className="flex items-center w-full h-full p-3 pl-5"
            >
              {isSubscriptions ? (
                <CollectionIconSolid className="h-4 w-4" />
              ) : (
                <CollectionIcon className="h-4 w-4" />
              )}

              <span className="ml-2">Subscriptions</span>
              {/* <ReactTooltip effect="solid"/> */}
            </a>
          </Link>
        </li>
      </ul>

      {/* Categories Section */}
      <div className="border-t-2 border-b-2 h-full border-gray-700 w-full flex flex-col">
        <span className="mt-3 ml-5 font-medium text-gray-400">
          Your Categories
        </span>
        {isLoading ? (
          <LoadingText>Loading Categories...</LoadingText>
        ) : (
          <ul className="mt-3">
            {/* New Category Button */}
            <li>
              <Link href={`/categories/create`} passHref>
                <a className={`pl-5 py-3 bg-gray-900 hover:bg-gray-700 flex items-center`}>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  <span className="w-40 truncate">New Category</span>
                </a>
              </Link>
            </li>
            {data?.categories?.length === 0 ? (
              <li>No categories available</li>
            ) : (
              data?.categories?.map((category) => (
                <NavCategoryListItem key={category.id} category={category} />
              ))
            )}
          </ul>
        )}
      </div>

      {/* Log Out */}
      <button
        data-tip="Log Out"
        onClick={handleLogout}
        className="flex items-center my-3"
      >
        <LogoutIcon className="h-5 w-5" />
        <span className="ml-2 hover:text-gray-300">Log Out</span>
        {/* <ReactTooltip effect="solid"/> */}
      </button>
    </nav>
  );
};

// TODO: since the call is made from the server the cookies are not sent w/ the request, so the endpoint will
// assume the user is not authed

// export async function getServerSideProps() {
// 	const api = new CategoryApi();
// 	api.setup();
//   const res = await api.getUserCategories()

// 	return { props: {categories: res.categories} }
// }

function areEqual(prevProps, nextProps) {
  // console.log(
  //   "ARE EQUAL",
  //   prevProps.data?.categories?.length === nextProps.data?.categories?.length &&
  //     prevProps.isLoading === nextProps.isLoading
  // );
  return (
    prevProps.data?.categories?.length === nextProps.data?.categories?.length &&
    prevProps.isLoading === nextProps.isLoading
  );
}

// TODO: figure out how to avoid rerenders
// export default DashboardNavigation;
export default React.memo(DashboardNavigation, areEqual);

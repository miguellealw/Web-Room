import {
  CollectionIcon,
  FolderIcon,
  FolderOpenIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { AuthApi } from "../api/auth";
import useUser from "../../shared-hooks/useUser";
import useCategories from "../../shared-hooks/useCategories";
import LoadingText from "../../components/LoadingText";
import Logo from "../../components/Logo";
import { useDrop } from "react-dnd";
import { Category } from "../api/types";
import useCategory from "../../shared-hooks/useCategory";

type NavCategoryListItemProps = {
  category: Category;
};

const NavCategoryListItem: React.FC<NavCategoryListItemProps> = ({
  category,
}) => {
  // TODO: consider not exposing fucntions from hook since fetch occurs and just add to js module
  const { addChannelToCategory } = useCategory(category.id);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "SUB_ITEM",
    // what is returned from here will be accessible from end in useDrag
    drop: (channel) => {
      console.log("USE DROP", channel);
      addChannelToCategory(channel.name, channel.id);
      return { name: `${category.name}`, id: category.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  return (
    <Link href={`/categories/${category.id}`} passHref key={category.id}>
      <a ref={drop} role={`Category`}>
        <li
          className={`pl-5 py-2 hover:bg-gray-700 flex ${
            isActive && "bg-gray-700"
          }`}
        >
          <FolderOpenIcon className="w-5 h-5 mr-2" />
          {category.name}
        </li>
      </a>
    </Link>
  );
};

const DashboardNavigation = () => {
  const { mutateUser } = useUser();
  const router = useRouter();
  const { data, error, isLoading } = useCategories();
  // console.log("NAV RERENDERDX")

  if (error) return <div>Error loading page...</div>;

  const handleLogout = async () => {
    mutateUser();
    const api = new AuthApi();
    api.setup();
    const response = await api.logout();
    router.replace("/");
    mutateUser();
  };

  return (
    <nav className="h-screen w-56 bg-gray-800 text-white flex flex-col items-center fixed left-0">
      {/* Logo */}
      <div className="w-full  my-3 flex items-center py-2 px-3">
        <Logo className="mr-2 w-6 h-6" />
        <h1>YouTube Box</h1>
      </div>

      {/* Subs and Categories */}
      <ul className="w-full">
        <li className="hover:bg-gray-700 w-full">
          <Link href="/categories" passHref>
            <a
              data-tip="Your Categories"
              className="flex items-center w-full h-full p-3 pl-5"
            >
              <FolderIcon className="h-5 w-5" />
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
              <CollectionIcon className="h-5 w-5" />
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
            {data?.categories?.length === 0 ? (
              <span>No categories available</span>
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

// TODO: figure out how to avoid rerenders
export default DashboardNavigation;
// export default memo(
// 	DashboardNavigation,
// 	(prevProps, nextProps) =>
// 		prevProps.categoriesData.data.categories.length === nextProps.categoriesData.data.categories.length
// )

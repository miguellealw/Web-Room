import useUser from "../../shared-hooks/useUser";
import DashboardNavigation from "./DashboardNavigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "../channels/CustomDragLayer";
import useFetchCategories from "../../shared-hooks/useFetchCategories";
import MobileNavigation from "./MobileNavigation";
import MobileTopNavBar from "./MobileTopNavBar";

interface AuthedLayoutProps {
  tw_className?: string;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  tw_className = "",
  ...props
}) => {
  const { isLoading } = useUser({
    redirectTo: "/login",
  });
  const { data, isLoading: isCategoriesLoading } = useFetchCategories();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-red-500">
        Dashboard Loading...
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="w-full min-h-screen bg-gray-100">
        <MobileNavigation />

        {/* TODO: if top nav bar is above dashboard nav then svg renders. If it is under it does not redner */}
        <DashboardNavigation data={data} isLoading={isCategoriesLoading} />
        <MobileTopNavBar />
        <div
          className={`${
            tw_className === "" ? "w-4/5 lg:w-1/3 m-auto" : tw_className
          }`}
          {...props}
        >
          {children}
        </div>
      </div>
    </DndProvider>
  );
};

export default AuthedLayout;

import DashboardNavigation from "./DashboardNavigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "../channels/CustomDragLayer";
import useFetchCategories from "../../shared-hooks/useFetchCategories";
import MobileNavigation from "./MobileNavigation";
import MobileTopNavBar from "./MobileTopNavBar";
import Toast from "../../components/Toast";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UsersApi } from "../../pages/api/users";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

interface AuthedLayoutProps {
  tw_className?: string;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  user,
  tw_className = "",
  ...props
}) => {
  const { data, isLoading: isCategoriesLoading } = useFetchCategories();

  if (user.isLoading || isCategoriesLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-red-500">
        Dashboard Loading...
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="w-full min-h-screen bg-gray-100 font-inter">
        {/* FIXME: if top nav bar is above dashboard nav then svg renders. If it is under it does not redner */}
        <DashboardNavigation isLoading={isCategoriesLoading} />
        <MobileTopNavBar />
        <MobileNavigation />
        <div
          className={`${
            tw_className === "" ? "w-4/5 lg:w-2/5 m-auto" : tw_className
          }`}
          {...props}
        >
          {children}
          <Toast />
        </div>
      </div>
    </DndProvider>
  );
};

export default withPageAuthRequired(AuthedLayout);

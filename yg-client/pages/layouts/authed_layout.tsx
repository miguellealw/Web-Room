import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import ReactTooltip from "react-tooltip";
import {
  ViewGridIcon,
  CollectionIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

import useUser from "../../utils/auth/useUser";
import { AuthApi } from "../api/auth";
import DashboardNavigation from "../../components/DashboardNavigation";
import useCategories from "../../utils/useCategories";

interface AuthedLayoutProps {
  tw_className?: string;
}

const AuthedLayout: FC<AuthedLayoutProps> = ({
  children,
  tw_className = "",
  ...props
}) => {
  const { isLoading } = useUser({
    redirectTo: "/login",
  });
  // const categoriesData = useCategories()

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-red-500">
        Dashboard Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div
        className={`${tw_className === "" ? "w-1/3 m-auto" : tw_className}`}
        {...props}
      >
        {/* <DashboardNavigation categoriesData={categoriesData}/>			 */}
        <DashboardNavigation />
        {children}
      </div>
    </div>
  );
};

export default AuthedLayout;

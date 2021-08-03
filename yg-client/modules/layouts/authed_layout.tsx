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
import Image from "next/image";

import Button from "../../components/Button";
import Link from "next/link";
import useSWR from "swr";

export const YouTubeMessage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold">Connect to YouTube</h1>
      <p className="text-gray-500 py-3">
        Connect to your YouTube account to get started
      </p>
      <Link href="/api/auth/yt-authorize" passHref>
        <a>
          <Button tw_className="text-sm flex justify-center items-center">
            Connect Now
          </Button>
        </a>
      </Link>
    </div>
  );
};

const EmailVerifiedMessage = ({ user }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      {/* <img src={user.picture} alt="" /> */}
      <Image
        src={user.picture}
        alt="User Profile Picture"
        width={150}
        height={150}
      />
      <h1 className="text-5xl font-bold mt-10">Verify Email</h1>
      <p className="text-gray-500 py-3 text-center px-7">
        Please verify your email to connect your YouTube account.
        <span className="font-bold"> After you verify your email log out and log back in.</span>
      </p>
      <Link href="/api/auth/logout" passHref>
        <a>
          <Button tw_className="text-sm flex justify-center items-center">
            Logout
          </Button>
        </a>
      </Link>
    </div>
  );
};

interface AuthedLayoutProps {
  tw_className?: string;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  tw_className = "",
  user,
  ...props
}) => {
  const { data: YTAuthedData, error } = useSWR("/api/auth/is-yt-authed", () =>
    axios.get("/api/auth/is-yt-authed").then((res) => res.data)
  );

  const { isLoading: isCategoriesLoading } = useFetchCategories();

  if (user.isLoading || !YTAuthedData || isCategoriesLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-red-500">
        Dashboard Loading...
      </div>
    );
  }

  if (!user.email_verified) {
    return <EmailVerifiedMessage user={user} />;
  }

  if (!YTAuthedData.isAuthedWithYouTube) {
    return <YouTubeMessage />;
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

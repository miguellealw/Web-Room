import LogoType from "../../components/LogoType";
import { LogoutIcon } from "@heroicons/react/outline";

const MobileTopNavBar = () => {
  return (
    <div className="w-full h-14 bg-white lg:hidden">
      <div className="h-full w-11/12 m-auto flex justify-between items-center">
        <LogoType />
        <LogoutIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default MobileTopNavBar;

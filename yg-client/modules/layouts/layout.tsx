import Link from "next/link";
import React, { FC } from "react";
import Logo from "../../components/Logo";
import LogoType from "../../components/LogoType";

const Layout: FC = ({ children }) => {
  return (
    <div className="font-inter">
      <nav className="w-full py-8 absolute flex justify-center z-20">
        <Link href="/" passHref>
          <a className="flex items-center">
            <LogoType />
          </a>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;

import React from "react";
import { Button } from "@/components/ui/button";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Logo from "@/public/sivi-favicon.png";
import Link from "next/link";
import Image from "next/image";

type DashboardHeaderProps = {
  toggleMiniSidebar: boolean;
  toggleResponsiveSidebar: boolean;
  setToggleResponsiveSidebar: (value: boolean) => void;
};

const DashboardHeader = ({
  toggleMiniSidebar,
  toggleResponsiveSidebar,
  setToggleResponsiveSidebar,
}: DashboardHeaderProps) => {
  return (
    <header
      className={`px-5   py-6 fixed top-0 transition-all lg:pb-[56px] duration-300 ${
        toggleMiniSidebar
          ? "lg:start-[80px] lg:w-[calc(100%-80px)]"
          : "lg:start-[260px] lg:w-[calc(100%-260px)]"
      }  w-full bg-backgroundV2 z-50 border border-b bg-white !pt-6`}
    >
      <div className="flex items-center lg:justify-end justify-between">
        {/* <div className="logo-part lg:hidden block"> */}
        <Link href={"/"} className="w-[25%] logo-part lg:hidden block">
          <Image src={Logo} alt="logo"  className="w-full" />
        </Link>
        {/* </div> */}
        <div className="flex items-center gap-2">
          <Button
            className="w-8 h-8 p-0 lg:hidden flex"
            onClick={() => setToggleResponsiveSidebar(!toggleResponsiveSidebar)}
          >
            {toggleResponsiveSidebar ? <Cross2Icon /> : <HamburgerMenuIcon />}
          </Button>
          <div className="">{/* <ThemeToogle /> */}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

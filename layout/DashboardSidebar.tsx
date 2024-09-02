import React, { useEffect, useState } from "react";
import { Tokens } from "@/constant/index";
import { useMediaQuery } from "react-responsive";
import IconDownSide from "@/components/svg/IconDownSide";
import IconLeftSide from "@/components/svg/IconLeftSide";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import {
  dashboardNavigation,
  adminDashboardNavigation,
} from "@/static/index";
import Divider from "@/components/common/Divider";
import IconLogout from "@/components/svg/IconLogout";
import Logo from "@/public/sivi-favicon.png";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type DashboardSidebarProps = {
  toggleMiniSidebar: boolean;
  setToggleMiniSidebar: any;
  setToggleResponsiveSidebar?: any;
  toggleResponsiveSidebar: boolean;
};

const DashboardSidebar = ({
  toggleMiniSidebar,
  setToggleMiniSidebar,
  toggleResponsiveSidebar,
}: DashboardSidebarProps) => {
  const [activeNestedNav, setActiveNestedNav] = useState(null);
  const role = localStorage.getItem(Tokens.ADMIN_ROLE);
  const token = localStorage.getItem(Tokens.ADMIN_TOKEN);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 992px)",
  });
  const handleLogout = () => {
    // localStorage.clear();
    // window.location.href = "/login";
    router.push("/login");

    // logout api call

    // dispatch(logout({ navigate }));
  };
  const handleNestedNavClick = (link: any) => {
    if (link !== activeNestedNav) {
      setActiveNestedNav(link);
    } else {
      setActiveNestedNav(null);
    }
  };

  useEffect(() => {
    //token
    if (token) {
      const fullPath = pathname.trim().toLowerCase();
      const parts = fullPath.split("/");
      // Get the last part of the path
      const partName: any = token ? parts[1] : parts[2];

      setActiveNestedNav(partName);
    }
  }, []);

  useEffect(() => {
    if (toggleMiniSidebar && token) {
      setActiveNestedNav(null);
    }
  }, [toggleMiniSidebar]);

  return (
    <aside
      onMouseEnter={() => setToggleMiniSidebar(false)}
      className={`fixed top-0 ${
        toggleResponsiveSidebar ? "start-0" : "-start-full"
      } lg:!start-0 transition-all duration-300 group ${
        toggleMiniSidebar && isLargeScreen
          ? "w-[80px] sidebar-mini"
          : "w-[260px]"
      } h-screen z-50 bg-white border border-e`}
    >
      <Button
        className={
          "bg-black w-7 h-7 p-0 rounded-full absolute top-3 -end-3.5 z-30 lg:flex hidden"
        }
        onClick={() => setToggleMiniSidebar(!toggleMiniSidebar)}
      >
        <ChevronLeftIcon
          strokeWidth={"2.2"}
          className={`text-white w-5 h-5 transition-all duration-300 ${
            toggleMiniSidebar ? "rotate-180" : ""
          }`}
        />
      </Button>
      <div className="sidebar-header logo-part p-5 pb-0 min-h-20 lg:block hidden ">
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="logo"
            className="transition-all w-full duration-300 group-[.sidebar-mini]:opacity-0 group-[.sidebar-mini]:invisible group-[.sidebar-mini]:w-0 opacity-100 visible"
          />
        </Link>
      </div>

    
      
      <div className="logout-part px-5 group-[.sidebar-mini]:px-3 transition-all duration-300">
        <div
          className={`px-5 group-[.sidebar-mini]:px-[19px]  block rounded-sm group cursor-pointer`}
        >
          <div
            className="flex items-center gap-4"
            onClick={(e) => {
              // localStorage.clear();
              e.preventDefault();
              handleLogout();
            }}
          >
            <span>
              <IconLogout className="text-black w-5 h-5" />
            </span>
            <h5 className="text-sm font-500 text-black group-[.active]:text-themeV2 group-[.sidebar-mini]:opacity-0 group-[.sidebar-mini]:invisible opacity-100 visible transition-all duration-300">
              Logout
            </h5>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

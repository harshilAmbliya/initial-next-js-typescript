import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import Backdrop from "@/components/common/Backdrop";
import Breadcrumbs from "@/components/common/Breadcrumbs";

type DashboardMasterProps = {
  children: React.ReactNode;
};

const DashboardMaster = ({ children }: DashboardMasterProps) => {
  const [toggleMiniSidebar, setToggleMiniSidebar] = useState(false);
  const [toggleResponsiveSidebar, setToggleResponsiveSidebar] = useState(false);

  return (
    <div className="dashboard-layout bg-backgroundV1 min-h-screen ">
      <DashboardHeader
        toggleResponsiveSidebar={toggleResponsiveSidebar}
        setToggleResponsiveSidebar={setToggleResponsiveSidebar}
        toggleMiniSidebar={toggleMiniSidebar}
      />
      <DashboardSidebar
        setToggleResponsiveSidebar={setToggleResponsiveSidebar}
        toggleResponsiveSidebar={toggleResponsiveSidebar}
        setToggleMiniSidebar={setToggleMiniSidebar}
        toggleMiniSidebar={toggleMiniSidebar}
      />
      <main
        className={`dashboard-layout-main transition-all duration-300 ${
          toggleMiniSidebar ? "lg:ps-[80px]" : "lg:ps-[260px]"
        }  min-h-[inherit] pt-[56px]`}
      >
        <div className="dashboard-pages-wrapper">
          <section className="p-2 pt-7 md:px-5">
            <Breadcrumbs />
          </section>
          {children}
        </div>
      </main>
      <Backdrop
        onClose={() => setToggleResponsiveSidebar(false)}
        show={toggleResponsiveSidebar}
      />
    </div>
  );
};

export default DashboardMaster;

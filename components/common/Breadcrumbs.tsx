import React from "react";
import IconDownSide from "../svg/IconDownSide";
import { Tokens } from "@/constant/index";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const role = localStorage.getItem(Tokens.ADMIN_ROLE);
  const location = usePathname();
  const pathnames = location.split("/").filter((x: any) => x);
  let breadcrumbPath = role === "user" ? "" : "/admin";

  const handleRedirectCondition = (breadcrumbPath: any) => {
    return breadcrumbPath;
  };

  const userBreadcrumbPath = () => {
    return pathnames.length >= 2
      ? pathnames.map((name: String, index: Number) => {
          breadcrumbPath += `/${name}`;
          const isLast = index === pathnames.length - 1;
          const isFirst = index === 0;

          return isLast ? (
            <span
              key={breadcrumbPath}
              className="text-xs text-textV2 font-500 capitalize"
            >
              {name}
            </span>
          ) : isFirst ? (
            <span key={breadcrumbPath} className="flex items-center gap-1">
              {" "}
              <Link
                href={
                  breadcrumbPath?.startsWith("/data-manager")
                    ? handleRedirectCondition(breadcrumbPath)
                    : ""
                }
                className={`text-xs ${
                  breadcrumbPath?.startsWith("/data-manager") && "text-blue-500"
                } font-500 flex items-center gap-1 capitalize`}
              >
                {name}
              </Link>{" "}
              <span>
                <IconDownSide className="text-textV2 w-4 h44 -rotate-90" />
              </span>
            </span>
          ) : (
            <span key={breadcrumbPath} className="flex items-center gap-1">
              {" "}
              <Link
                href={breadcrumbPath}
                className="text-xs text-blue-500 font-500 flex items-center gap-1 capitalize"
              >
                {name}
              </Link>{" "}
              <span>
                <IconDownSide className="text-textV2 w-4 h44 -rotate-90" />
              </span>
            </span>
          );
        })
      : "";
  };

  const adminBreadcrumbPath = () => {
    return pathnames.length >= 3
      ? pathnames.toSpliced(0, 1).map((name: String, index: Number) => {
          breadcrumbPath += `/${name}`;

          const isLast = index === pathnames.toSpliced(0, 1).length - 1;
          const isFirst = index === 0;

          return isLast ? (
            <span
              key={breadcrumbPath}
              className="text-xs text-textV2 font-500 capitalize"
            >
              {name}
            </span>
          ) : isFirst ? (
            <span key={breadcrumbPath} className="flex items-center gap-1">
              {" "}
              <Link
                href={
                  breadcrumbPath === "/portfolio"
                    ? "/"
                    : breadcrumbPath === "/allocation"
                    ? "/allocation"
                    : "#"
                }
                className="text-xs text-themeV2 font-500 flex items-center gap-1 capitalize"
              >
                {name}
              </Link>{" "}
              <span>
                <IconDownSide className="text-textV2 w-4 h44 -rotate-90" />
              </span>
            </span>
          ) : (
            <span key={breadcrumbPath} className="flex items-center gap-1">
              {" "}
              <Link
                href={breadcrumbPath}
                className="text-xs text-themeV2 font-500 flex items-center gap-1 capitalize"
              >
                {name}
              </Link>{" "}
              <span>
                <IconDownSide className="text-textV2 w-4 h44 -rotate-90" />
              </span>
            </span>
          );
        })
      : "";
  };

  return (
    <div className="breadcrunbs flex items-center gap-1">
      {role === "user" ? userBreadcrumbPath() : adminBreadcrumbPath()}
    </div>
  );
};

export default Breadcrumbs;

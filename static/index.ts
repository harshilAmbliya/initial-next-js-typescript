import { getIcons } from "./getIcon";

export const dashboardNavigation :any= [
  {
    id: "1",
    link: "Create-Json",
    href: "/create-json",
    icon: getIcons("PensionIcon"),
    hasChild: true,
    childrenNavigation: [
      { link: "SIVI1 (0001a)", href: "/create-json/pension-form", icon: getIcons("JsonIcon") },
      { link: "SIVI2 (0001b)", href: "/create-json/cashflow", icon: getIcons("JsonIcon") },
      { link: "SIVI3 (0001c)", href: "/create-json/pension-projection", icon: getIcons("JsonIcon") },
      { link: "SIVI4 (00002)", href: "/create-json/sivi4_(00002)", icon: getIcons("JsonIcon") },
      { link: "Feedback Message", href: "/create-json/feedback-json", icon: getIcons("JsonIcon") },
    ],
  },
  {
    id: "2",
    link: "Validate-Json",
    href: "/validate-json",
    icon: getIcons("Validate-Json"),
    hasChild: true,
    childrenNavigation: [
      { link: "SIVI1 (0001a)", href: "/validate-json/pension-form", icon: getIcons("validate-json-sub-node") },
      { link: "SIVI2 (0001b)", href: "/validate-json/cashflow", icon: getIcons("validate-json-sub-node") },
      { link: "SIVI3 (0001c)", href: "/validate-json/pension-projection", icon: getIcons("validate-json-sub-node") },
      { link: "SIVI4 (00002)", href: "/validate-json/sivi4_(00002)", icon: getIcons("validate-json-sub-node") },
      { link: "Feedback Message", href: "/validate-json/validate-form", icon: getIcons("validate-json-sub-node") },
    ],
  },
  {
    id: "3",
    link: "Visualise-Json",
    href: "/Visualise-json",
    icon: getIcons("Visualise-json"),
    hasChild: true,
    childrenNavigation: [
      { link: "SIVI1 (0001a)", href: "/Visualise-json/pension-form", icon: getIcons("Visualise-json-sub-node") },
      { link: "SIVI2 (0001b)", href: "/Visualise-json/cashflow", icon: getIcons("Visualise-json-sub-node") },
      { link: "SIVI3 (0001c)", href: "/Visualise-json/pension-projection", icon: getIcons("Visualise-json-sub-node") },
      { link: "SIVI4 (00002)", href: "/Visualise-json/sivi4-00002", icon: getIcons("Visualise-json-sub-node") },
    ],
  },
  {
    id: "4",
    link: "Data Manager ",
    href: "/data-manager",
    icon: getIcons("Data-Manager"),
  },
  {
    id: "5",
    link: "Profile ",
    href: "/profile",
    icon: getIcons("profile"),
  },
  // visualize-json
  // {
  //   id: "3",
  //   link: "Visualise Json ",
  //   href: "/Visualise-json",
  //   icon: getIcons("Validate-Json"),
  // },
];


export const adminDashboardNavigation :any = [
  {
    id: "1",
    link: "Users ",
    href: "/admin/users",
    icon: getIcons("User"),
  },
]
import { AlignVerticalSpaceAround, Database, FileJsonIcon, Icon, LucideFileJson, NotepadText, PenSquareIcon, TrendingUp, User } from "lucide-react";
import { CiUser } from "react-icons/ci";
const icons = [
  {
    name: "JsonIcon",
    icon: <FileJsonIcon className="w-10 h-8" />,
  },
  {
    name: "PensionIcon",
    icon: <PenSquareIcon className="w-8 h-8" />,
  },
  {
    name: "User",
    icon: <User />,
  },
  {
    name: "Validate-Json",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    name: "validate-json-sub-node",
    icon: <NotepadText className="w-8 h-8" />,
  },
  {
    name: "Visualise-json",
    icon: <LucideFileJson className="w-8 h-8" />,
  },
  {
    name: "Visualise-json-sub-node",
    icon: <AlignVerticalSpaceAround className="w-8 h-8" />,
    // icon: <img src={VisualizeJsonSubNode} alt="pension Icon" className="w-8 h-8" />
  },
  {
    name: "Data-Manager",
    icon: <Database className="w-8 h-8" />,
    // icon: <img src={DataManager} alt="pension Icon" className="w-8 h-8" />
  },
  {
    name: "profile",
    icon: <CiUser className="w-8 h-8 font-light" />,
  },
];

export const getIcons = (icon: any) => {
  const getIcon = icons.find((item) => item?.name === icon);
  return getIcon?.icon;
};

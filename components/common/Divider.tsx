import React from "react";
import { cn } from "../../lib/utils";

const Divider = ({ className }: { className?: String }) => {
  return <div className={cn("w-full border-t border-borderV2", className)} />;
};

export default Divider;

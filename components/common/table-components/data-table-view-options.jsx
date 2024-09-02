"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import IconAdd from "@/components/svg/IconAdd";

function DataTableViewOptions({
  table, isCommon, headerButtons = [], isRight, onCommon, isCommonIcon, isCollViewHide, btnName, isPortfolio, isPortfolioGroup, onPortfolio, onPortfolioGroup, isInvest, onIsInvest, isInvestIcon, isInvestName, isInvestRemove, onIsInvestRemove, isInvestRemoveIcon, isInvestRemoveName, 
  }) {
  const renderActionButton = (
    key,
    icon,
    text,
    onClick,
    size = "sm",
    variant = "",
    additionalClass = ""
  ) => (
    <Button
      key={key}
      size={size}
      variant={variant}
      className={`rounded-[6px] h-8 lg:flex group ${additionalClass}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      {text}
    </Button>
  );
  return (
    <div className="dialog-box-action flex items-center gap-4 flex-wrap">
      {headerButtons.map((button, index) => (
        renderActionButton(
          `header_${index}`,  // Use a stable key
          button.icon,
          button.text,
          button.onClick,
          button.size,
          button.variant,
          button.additionalClass
        )
      ))}
      {isCommon ? <Button size="sm" className={"rounded-[6px] h-8 lg:flex group"} onClick={onCommon}>
        <span>{isCommonIcon}</span>
        {btnName}
      </Button> : ''}
      {isInvest ? <Button size="sm" className={"rounded-[6px] h-8 lg:flex group"} onClick={onIsInvest}>
        <span>{isInvestIcon}</span>
        {isInvestName}
      </Button> : ''}
      {isInvestRemove ? <Button size="sm" variant="outline" className={"rounded-[6px] h-8 lg:flex group !border-red !text-red"} onClick={onIsInvestRemove}>
        <span>{isInvestRemoveIcon}</span>
        {isInvestRemoveName}
      </Button> : ''}
      {isPortfolio ? <Button size="sm" className={"rounded-[6px] h-8 lg:flex group"} onClick={onPortfolio}>
        <span><IconAdd className="w-4 h-4 text-white transition-colors duration-200 group-hover:text-white" /></span>
        Add Portfolio
      </Button> : ''}
      {isPortfolioGroup ? <Button size="sm" className={"rounded-[6px] h-8 lg:flex group"} onClick={onPortfolioGroup}>
        <span><IconAdd className="w-4 h-4 text-white transition-colors duration-200 group-hover:text-white" /></span>
        Add Portfolio Group
      </Button> : ''}

      {!isCollViewHide ? <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex hover:bg-[#F5F5F5]"
          >
            <MixerHorizontalIcon className="h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.replace(/_/g, " ")}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
        : ''}
    </div>

  );
}

export default DataTableViewOptions;

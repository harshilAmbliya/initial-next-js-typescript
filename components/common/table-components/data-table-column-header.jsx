import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DataTableColumnHeader({
  column,
  title,
  className,
  isCustom,
  handleSort,
  accessorKey
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)} title={title || ''}>{title}</div>;
  }

  return (
    <div className={cn("", className)} onClick={() => {
      // if (column.getIsSorted() === "desc") {
      //   column.toggleSorting(false)
      // } else if (column.getIsSorted() === "asc") {
      //   column.toggleSorting(true)
      // } else {
      //   column.toggleSorting(true)
      // }
    }}>
      {/* <span>{title}</span> */}
      {/* {column.getIsSorted() === "desc" ? (
        <ArrowDownIcon className="ml-2 h-4 w-4" onClick={() => column.toggleSorting(false)} />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUpIcon className="ml-2 h-4 w-4" onClick={() => column.toggleSorting(true)} />
      ) : (
        <ArrowUpIcon className="ml-2 h-4 w-4" onClick={() => column.toggleSorting(true)} />
      )} */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent p-0"
          >
            <span title={title || ''}>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1.5">
          <DropdownMenuItem className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" onClick={() => isCustom ? handleSort(accessorKey, false): column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" onClick={() => isCustom ? handleSort(accessorKey, false) : column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTableColumnHeader;

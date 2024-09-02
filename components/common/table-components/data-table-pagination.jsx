import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";

function DataTablePagination(props) {
  const { table, setPerPage, perPage, totalRecords, currentPage, setCurrentPage, totalPages, isPerPageHide } = props;
  const handlePreviousPage = () => {
    // table.previousPage();
    setCurrentPage((prev) => prev - 1)
  };
  const handleNextPage = () => {
    // table.nextPage()
    setCurrentPage((prev) => prev + 1)
  };

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
  }
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  // {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} Items
  return (
    <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-2">
      <div className="text-sm text-muted-foreground sm:flex hidden">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected. */}
        <span className="text-xs text-textV1 font-500"> {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} Items</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-6 sm:justify-start justify-between">
        {!isPerPageHide ? <div className="flex items-center space-x-2">
          <p className="text-xs font-500 text-textV1">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              setPerPage(Number(value));
              setCurrentPage(1)
            }}
          >
            {/* endIcon={<ChevronsUpDown className="h-4 w-4 text-textV1" strokeWidth={"2.2"} />} */}
            <SelectTrigger className="h-6 w-[48px] px-1 py-1 rounded-[4px] text-xs">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem className="!text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> : ''}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex  items-center justify-center text-sm font-medium">
            <span className="text-xs  font-500 text-textV1">  Page {currentPage} of{" "}
              {totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-6 w-6 rounded-[4px] p-0 lg:flex border border-borderV1 text-textV1"
              onClick={handleFirstPage}
              disabled={currentPage === 1 || currentPage <= 0}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-6 w-6 rounded-[4px] p-0 border border-borderV1 text-textV1"
              onClick={handlePreviousPage}
              disabled={currentPage < 1 || currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-6 w-6 rounded-[4px] p-0 border border-borderV1 text-textV1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-6 w-6 rounded-[4px] p-0 lg:flex border border-borderV1 text-textV1"
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;

import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'

const TablePagination = (props) => {
  const { table, currentPage, setCurrentPage, totalPages} = props;

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



  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-xs font-medium">
        Page {currentPage} of{" "}
        {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-6 w-6  p-0 lg:flex"
          onClick={handleFirstPage}
          disabled={currentPage === 1 || currentPage <= 0}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-6 w-6  p-0"
          onClick={handlePreviousPage}
          disabled={currentPage < 1 || currentPage === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-6 w-6  p-0"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-6 w-6  p-0 lg:flex"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default TablePagination
import React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import DataTablePagination from "./data-table-pagination"
import DataTableToolbar from "./data-table-toolbar"
import { useSelector } from 'react-redux'
import Loading from "@/components/common/Loading"

export function DataTableWithCustomPagination({ data, columns, filterName, isRight = false, isCommon, onCommon, isCommonIcon, btnName, isPortfolio, isPortfolioGroup, onPortfolio, onPortfolioGroup, isInvest,  onIsInvest,  isInvestIcon,  isInvestName, isInvestRemove,  onIsInvestRemove,  isInvestRemoveIcon,  isInvestRemoveName, loadData,
  isCollViewHide, isPerPageHide, isOldHeaderHide,
    setPerPage, perPage, totalRecords, currentPage, setCurrentPage, totalPages, isSearchHide, isSelectorDisable,
    
    isSelector, selectorOp, selectorValue, selectorOnChange, selectorName,

    hasSettingBtn, sectionType,  isGroup, isAsset, hidePagination,

    isRightSearch, isLeftSearch, leftHeaderButtons, isLeftHeaderButtons, isRightHeaderButtons, rightHeaderButtons, isRightNew,

    isCustomSearch = false, onSearch,
}) {
  const { isLoading } = useSelector((state) => state);
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [sorting, setSorting] = React.useState([])

  const table = useReactTable({
    data,
    columns,
    state: hidePagination ? {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: data.length,
      }
    } : {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })


  return (
    <section className=''>
    {/* <section className='p-2 md:px-5'> */}
          <DataTableToolbar  isCollViewHide={isCollViewHide} table={table} filterName={filterName} isSelector={isSelector} selectorOp={selectorOp} selectorValue={selectorValue} selectorOnChange={selectorOnChange} selectorName={selectorName} isSelectorDisable={isSelectorDisable}
          isSearchHide={isSearchHide} isCommon={isCommon} onCommon={onCommon} isCommonIcon={isCommonIcon} btnName={btnName} isPortfolio={isPortfolio} isPortfolioGroup={isPortfolioGroup} onPortfolio={onPortfolio} onPortfolioGroup={onPortfolioGroup} isInvest={isInvest}  onIsInvest={onIsInvest}  isInvestIcon={isInvestIcon}  isInvestName={isInvestName} isInvestRemove={isInvestRemove}  onIsInvestRemove={onIsInvestRemove}  isInvestRemoveIcon={isInvestRemoveIcon}  isInvestRemoveName={isInvestRemoveName} 
          hasSettingBtn={hasSettingBtn} sectionType={sectionType}  isGroup={isGroup} isAsset={isAsset} isRight={isRight}
          isOldHeaderHide={isOldHeaderHide}  isCustomSearch={isCustomSearch}
          onSearch={onSearch}

          isRightSearch={isRightSearch} isLeftSearch={isLeftSearch} leftHeaderButtons={leftHeaderButtons} isLeftHeaderButtons={isLeftHeaderButtons} isRightHeaderButtons={isRightHeaderButtons} rightHeaderButtons={rightHeaderButtons} isRightNew={isRightNew}
          />
          <div className="rounded-sm border my-4">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header?.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loadData || isLoading ? 
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    <Loading />
                  </TableCell>
                </TableRow> : 
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns?.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {!hidePagination && <DataTablePagination table={table} isPerPageHide={isPerPageHide} setPerPage={setPerPage} perPage={perPage} totalRecords={totalRecords} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
    </section>
  )
}

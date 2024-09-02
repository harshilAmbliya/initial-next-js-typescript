import React, { useEffect, useState } from "react"
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
import { Filters } from "@/constant/index"
import { cn } from "@/lib/utils"

export function DataTableNew({ tableClass, data, columns, onChange, customNoRecordsPlaceholder, columnKey, isSearchHide = false, filterName, isCollViewHide, isCommon, onCommon, isCommonIcon, btnName, isPortfolio, isPortfolioGroup, onPortfolio, onPortfolioGroup, isInvest, onIsInvest, isInvestIcon, isInvestName, isInvestRemove, onIsInvestRemove, isInvestRemoveIcon, isInvestRemoveName, fetchAssetData, loadData,
  hasSettingBtn, sectionType, isGroup, isAsset, headerButtons = [], isRight = false, isCustomSearch = false, onSearch,
  isRightSearch, isLeftSearch, leftHeaderButtons, isLeftHeaderButtons, isRightHeaderButtons, rightHeaderButtons, isRightNew, isOldHeaderHide, hidePagination
}) {
  const metaData = useSelector((state) => state?.metaData ? state?.metaData : null);
  const isLoading = useSelector((state) => state?.loading ? state?.loading : null);

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState(columnKey || {})
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [sorting, setSorting] = React.useState([])

  // pagination
  const [currentPage, setCurrentPage] = useState(Filters.PAGE);
  const [perPage, setPerPage] = useState(Filters.OBJ.perPage); // Default per page value
  const [totalRecords, setTotalRecords] = useState(Filters.OBJ.totalRecords)
  const [totalPages, setTotalPages] = useState(Filters.OBJ.totalPages);

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
        pageSize: data?.length,
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

  useEffect(() => {
    const localColumns = localStorage.getItem("columnVisibility");

    if (localColumns) {
      try {
        const data = JSON.parse(localColumns);
        setColumnVisibility((prev) => {
          return {
            ...prev,
            ...data
          }
        });
      } catch (error) {
      }

    }
  }, [])

  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility))
  }, [columnVisibility]);


  useEffect(() => {
    setCurrentPage(Filters.PAGE)
    setPerPage(Filters.OBJ.perPage)
  }, [])

  useEffect(() => {
    onChangeDidMount();
  }, [currentPage, perPage])

  useEffect(() => {
    setTotalRecords(metaData.totalItems)
    setTotalPages(Math.ceil(metaData.totalItems / metaData.perPage))
  }, [metaData]);

  const onChangeDidMount = () => {
    const filters = {
      page: currentPage,
      perPage: perPage
    };
    onChange(filters);
  };

  return (
    <div className="">
      <DataTableToolbar table={table} filterName={filterName} isSearchHide={isSearchHide} isCollViewHide={isCollViewHide} isRight={isRight} headerButtons={headerButtons} isCommon={isCommon} onCommon={onCommon} isCommonIcon={isCommonIcon} btnName={btnName} isPortfolio={isPortfolio} isPortfolioGroup={isPortfolioGroup} onPortfolio={onPortfolio} onPortfolioGroup={onPortfolioGroup} isInvest={isInvest} onIsInvest={onIsInvest} isInvestIcon={isInvestIcon} isInvestName={isInvestName} isInvestRemove={isInvestRemove} onIsInvestRemove={onIsInvestRemove} isInvestRemoveIcon={isInvestRemoveIcon} isInvestRemoveName={isInvestRemoveName} hasSettingBtn={hasSettingBtn} sectionType={sectionType} isGroup={isGroup} isAsset={isAsset}
        isOldHeaderHide={isOldHeaderHide}
        isCustomSearch={isCustomSearch} onSearch={onSearch}
        isRightSearch={isRightSearch} isLeftSearch={isLeftSearch} leftHeaderButtons={leftHeaderButtons} isLeftHeaderButtons={isLeftHeaderButtons} isRightHeaderButtons={isRightHeaderButtons} rightHeaderButtons={rightHeaderButtons} isRightNew={isRightNew}

      />
      {columns?.length > 0 && <div className="rounded-sm border my-3 ">
        <Table className={cn("min-w-[800px]", tableClass)}>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header?.colSpan} className="bg-[#F1F5F9]">
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
            {loadData || isLoading?.loading ? <TableRow>
              <TableCell
                colSpan={columns?.length}
                className="h-24 text-center"
              >
                <Loading />
              </TableCell>
            </TableRow> : table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
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
                  {customNoRecordsPlaceholder || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>}
      {!hidePagination && <DataTablePagination table={table} setPerPage={setPerPage} perPage={perPage} totalRecords={totalRecords} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
    </div>

  )
}

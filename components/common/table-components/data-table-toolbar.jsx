import { Input } from "@/components/ui/input";
import DataTableViewOptions from "./data-table-view-options";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

function DataTableToolbar({ table, filterName, headerButtons = [], isRight = false, isCollViewHide, isSelectorDisable, isSelector, selectorName, selectorOp, selectorValue, selectorOnChange, isSearchHide, isCommon, onCommon, isCommonIcon, btnName, isPortfolio, isPortfolioGroup, onPortfolio, onPortfolioGroup, isInvest, onIsInvest, isInvestIcon, isInvestName, isInvestRemove, onIsInvestRemove, isInvestRemoveIcon, isInvestRemoveName, hasViewOption, hasSettingBtn, sectionType, isGroup, isAsset,
  isCustomSearch, onSearch, isRightSearch, isLeftSearch, leftHeaderButtons, isLeftHeaderButtons, isRightHeaderButtons, rightHeaderButtons, isRightNew, isOldHeaderHide

}) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchVlu, setSearchVlu] = useState('')

  useEffect(() => {
    const delayedSearch = debounce((value) => {
      onSearch(value);
    }, 500);

    if (searchVlu.length >= 1) {
      // Call delayedSearch only if there's been a period of inactivity
      // after the last keystroke
      delayedSearch(searchVlu);
    }

    return () => {
      // Clean up debounce timer if component unmounts or searchVlu changes
      clearTimeout(delayedSearch);
    };
  }, [searchVlu]);


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
    <>
      {/* // old header  */}
      {!isOldHeaderHide && <div>
        {isRight ?

          <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-2">

            {
              // hasViewOption && 
              <DataTableViewOptions table={table} headerButtons={headerButtons} isRight={isRight} isCollViewHide={isCollViewHide} isCommon={isCommon} onCommon={onCommon} isCommonIcon={isCommonIcon} btnName={btnName} isPortfolio={isPortfolio} isPortfolioGroup={isPortfolioGroup} onPortfolio={onPortfolio} onPortfolioGroup={onPortfolioGroup} isInvest={isInvest} onIsInvest={onIsInvest} isInvestIcon={isInvestIcon} isInvestName={isInvestName} isInvestRemove={isInvestRemove} onIsInvestRemove={onIsInvestRemove} isInvestRemoveIcon={isInvestRemoveIcon} isInvestRemoveName={isInvestRemoveName}

              />
            }
            <div className="flex flex-0 items-end space-x-2">
              {!isSearchHide && <Input
                placeholder="Search Filter..."
                value={(table.getColumn(filterName ? filterName : '')?.getFilterValue() || "")}
                onChange={(event) =>
                  table.getColumn(filterName ? filterName : '')?.setFilterValue(event.target.value)
                }
                className="h-8 w-full sm:w-[150px] lg:w-[250px]"
              />}

              {isSelector ? <div className="form-group w-[30%] flex items-baseline justify-center">
                <Label htmlFor="name" className="block mb-2.5 text-textV1 font-500 me-2">
                  Source:
                </Label>
                <Select
                  onValueChange={(e) => selectorOnChange(e)}
                  defaultValue={selectorValue}
                  disabled={isSelectorDisable}
                >
                  <SelectTrigger className="w-full py-2 text-xs">
                    <SelectValue
                      className='text-textV1'
                      placeholder={selectorName}
                      disabled={isSelectorDisable}
                    >
                      {selectorValue?.label ? selectorValue?.label : selectorName}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        selectorOp && selectorOp.length > 0 ? selectorOp.map((item, index) => {
                          return <SelectItem key={index} className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" value={JSON.stringify(item)}>{item?.label}</SelectItem>
                        }) : <SelectItem disabled className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2 text-center" value={'No option'}>{'No option'}</SelectItem>
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> : ''}
            </div>
          </div>

          :


          <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-2">
            <div className="flex flex-1 items-center space-x-2">
              {!isSearchHide && <Input
                placeholder="Search Filter..."
                value={(table?.getColumn(filterName ? filterName : '')?.getFilterValue() || "")}
                onChange={(event) =>
                  table.getColumn(filterName ? filterName : '')?.setFilterValue(event.target.value)
                }
                className="h-8 w-full sm:w-[150px] lg:w-[250px] m-[5px]"
              />}
              {/* <Button>Add</Button> */}
              {
                // default left buttons 
                isLeftHeaderButtons && leftHeaderButtons?.length > 0 && leftHeaderButtons?.map((button) => {
                  return <Button key={Math.random() * 100} onClick={button?.onClick} className={`text-[12px] !px-3 !py-2 h-auto ${button?.className} `}> <span className={`${button?.icon && "me-1"}`}>{button?.icon}</span> {button?.name || "Add "}</Button>
                })
              }
              {isSelector ? <div className="form-group w-[30%] flex items-baseline justify-center">
                <Label htmlFor="name" className="block mb-2.5 text-textV1 font-500 me-2">
                  Source:
                </Label>
                <Select
                  onValueChange={(e) => selectorOnChange(e)}
                  defaultValue={selectorValue}
                  disabled={isSelectorDisable}
                >
                  <SelectTrigger className="w-full py-2 text-xs">
                    <SelectValue
                      className='text-textV1'
                      placeholder={selectorName}
                      disabled={isSelectorDisable}
                    >
                      {selectorValue?.label ? selectorValue?.label : selectorName}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        selectorOp && selectorOp.length > 0 ? selectorOp.map((item, index) => {
                          return <SelectItem key={index} className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" value={JSON.stringify(item)}>{item?.label}</SelectItem>
                        }) : <SelectItem disabled className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2 text-center" value={'No option'}>{'No option'}</SelectItem>
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> : ''}
            </div>

            {
              // hasViewOption && 
              <DataTableViewOptions table={table} headerButtons={headerButtons} isRight={isRight} isCollViewHide={isCollViewHide} isCommon={isCommon} onCommon={onCommon} isCommonIcon={isCommonIcon} btnName={btnName} isPortfolio={isPortfolio} isPortfolioGroup={isPortfolioGroup} onPortfolio={onPortfolio} onPortfolioGroup={onPortfolioGroup} isInvest={isInvest} onIsInvest={onIsInvest} isInvestIcon={isInvestIcon} isInvestName={isInvestName} isInvestRemove={isInvestRemove} onIsInvestRemove={onIsInvestRemove} isInvestRemoveIcon={isInvestRemoveIcon} isInvestRemoveName={isInvestRemoveName} />
            }
          </div>}</div>}



      {/* // new header  */}
      {isRightNew ?
        <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-2">
          <div className="flex flex-0 items-end space-x-2">
            {/* right Search box  */}
            {!isSearchHide && isRightSearch ? isCustomSearch ?

              <Input
                placeholder="Search Filter..."
                value={searchVlu}
                onChange={(event) => setSearchVlu(event.target.value)}
                className="h-8 w-full sm:w-[150px] lg:w-[250px]"
              />

              : <Input
                placeholder="Search Filter..."
                value={filterName ? table.getColumn(filterName ? filterName : '')?.getFilterValue() : ''}
                onChange={(event) => {
                  filterName && table.getColumn(filterName ? filterName : '')?.setFilterValue(event.target.value)
                }}
                className="h-8 w-full sm:w-[150px] lg:w-[250px]"
              /> : ''}
            {/* right buttons  */}

            {isRightHeaderButtons && rightHeaderButtons.map((button, index) => (
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
            {isSelector ? <div className="form-group w-[30%] flex items-baseline justify-center">
              <Label htmlFor="name" className="block mb-2.5 text-textV1 font-500 me-2">
                Source:
              </Label>
              <Select
                onValueChange={(e) => selectorOnChange(e)}
                defaultValue={selectorValue}
                disabled={isSelectorDisable}
              >
                <SelectTrigger className="w-full py-2 text-xs">
                  <SelectValue
                    className='text-textV1'
                    placeholder={selectorName}
                    disabled={isSelectorDisable}
                  >
                    {selectorValue?.label ? selectorValue?.label : selectorName}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      selectorOp && selectorOp.length > 0 ? selectorOp.map((item, index) => {
                        return <SelectItem key={index} className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2" value={JSON.stringify(item)}>{item?.label}</SelectItem>
                      }) : <SelectItem disabled className="text-xs flex items-center gap-2 cursor-pointer text-theme font-500 hover:bg-[#d7ebff] rounded-[4px] py-2 text-center" value={'No option'}>{'No option'}</SelectItem>
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> : ''}
          </div>
          <div className="flex flex-0 items-end space-x-2">
            {/* left Search box  */}
            {!isSearchHide && isLeftSearch ? isCustomSearch ? <Input
              placeholder="Search Filter..."
              value={searchVlu}
              onChange={(event) => setSearchVlu(event.target.value)}
              className="h-8 w-full sm:w-[150px] lg:w-[250px]"
            /> : <Input
              placeholder="Search Filter..."
              value={filterName ? table.getColumn(filterName ? filterName : '')?.getFilterValue() : ''}
              onChange={(event) =>
                filterName && table.getColumn(filterName ? filterName : '')?.setFilterValue(event.target.value)
              }
              className="h-8 w-full sm:w-[150px] lg:w-[250px]"
            /> : ''}
            {/* left buttons  */}
            {isLeftHeaderButtons && leftHeaderButtons.map((button, index) => (
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

            {
              // hasViewOption && 
              <DataTableViewOptions table={table} headerButtons={headerButtons} isRight={isRight} isCollViewHide={isCollViewHide} isCommon={isCommon} onCommon={onCommon} isCommonIcon={isCommonIcon} btnName={btnName} isPortfolio={isPortfolio} isPortfolioGroup={isPortfolioGroup} onPortfolio={onPortfolio} onPortfolioGroup={onPortfolioGroup} isInvest={isInvest} onIsInvest={onIsInvest} isInvestIcon={isInvestIcon} isInvestName={isInvestName} isInvestRemove={isInvestRemove} onIsInvestRemove={onIsInvestRemove} isInvestRemoveIcon={isInvestRemoveIcon} isInvestRemoveName={isInvestRemoveName}

              />
            }
          </div>

        </div> : ''}
    </>
  );
}

export default DataTableToolbar;

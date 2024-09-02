import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import DatePicker from "tailwind-datepicker-react"
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from 'moment-js'

export const DatePickerCustomInput = (props) => {
    const { onDateSelect, className, disabled, placeholderText, mainClassName, selectedFromDate, minDate, value, upDateData, readOnly, name } = props;
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(null)
    const datePickerRef = useRef(null);

    useEffect(() => {
        // if (value !== null) {
            const getVl = value === undefined ? null : value === null ? null : value
            setDate(getVl)
        // }
    }, [value, upDateData])

    useEffect(() => {
        function handleClickOutside(event) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [datePickerRef]);

    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date(minDate) || new Date("1600-01-01"), // Update minDate dynamically
        disabledDates: [],
        readOnly: readOnly || false,
        theme: {
            background: "bg-white rounded-sm p-2 w-[216px] !shadow-md",
            todayBtn: "",
            clearBtn: "hidden",
            icons: "",
            text: "hello !rounded-[4px]  font-500 text-gray-700 !text-xs w-full h-6 flex items-center justify-center",
            disabledText: "text-gray-200 font-500 !rounded-[4px] !text-xs w-full h-6 flex items-center justify-center pointer-events-none line-through",
            input: "inline-flex items-center gap-2 whitespace-nowrap outline-none group/btn rounded-sm transition-colors disabled:pointer-events-none disabled:opacity-50 bg-transparent px-3 py-2 text-xs w-[160px] md:w-[100%] justify-start text-left font-normal border border-borderV1 hover:border-borderV1 hover:text-theme text-muted-foreground",
            inputIcon: "",
            selected: "!bg-[#2487EE] hover:!bg-[#2487EE] !text-white",
        },
        icons: {
            prev: () => <span><ChevronsLeft className='w-4 h-4' /></span>,
            next: () => <span><ChevronsRight className='w-4 h-4' /></span>,
        },
        datepickerClassNames: "custome-datepicker w-full absolute",
        language: "en",
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: placeholderText || "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }
    }

    useEffect(() => {
        // Update minDate dynamically when selectedFromDate changes
        if (selectedFromDate) {
            options.minDate = selectedFromDate;
        }
    }, [selectedFromDate]);

    const handleChange = (selectedDate) => {
        
        onDateSelect(selectedDate)
        setDate(selectedDate)
    }

    const handleClose = (state) => {
        setShow(state)
    }

    return (
        <div ref={datePickerRef} className={cn('relative main-date-picker-wrapper min-w-[160px] w-full', mainClassName)}>
            <DatePicker options={options} name={name || "date"} classNames={className ? className : 'w-full'} onChange={(disabled || readOnly) ? null : handleChange} show={(disabled || readOnly) ? false : show} setShow={handleClose}>
                <div className={"flex align-middle w-[100%] px-4 rounded-sm border border-[##E2E8F0] text-textV2 bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50 !py-1.5 h-[34px] placeholder:text-xs text-xs"}>
                    <input type="text" className={`border-0 outline-none ps-0 w-full ${date === null && 'text-[#a5a3af]'} `} placeholder="Select Date" value={date !== null ? moment(date).format('YYYY-MM-DD') : 'YYYY-MM-DD'} onFocus={() => setShow(true)} readOnly />
                    <div className="...">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                </div>
            </DatePicker>
        </div>
    )
}
//date !== null ? moment(date).format('YYYY-MM-DD') : 'YYYY-MM-DD'

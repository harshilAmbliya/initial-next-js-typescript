import { format, getMonth, getYear, getDate, subMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NewCalender } from '@/components/ui/newCalender';

const CustomDatePickerComponent = ({ value, onChange, className, placeholderClassNames, placeholder = "Pick a date" }) => {
    const [date, setDate] = React.useState(value !== null ? new Date(value) : null);
    const [year, setYear] = React.useState(value !== null ? getYear(new Date(value)) : getYear(new Date()));
    const [month, setMonth] = React.useState(value !== null ? getMonth(new Date(value)) : getMonth(new Date()));
    const [day, setDay] = React.useState(value !== null ? getDate(new Date(value)) : getDate(new Date()));
    const [isOpen, setIsOpen] = React.useState(false);
    const [changedMonth, setChangedMonth] = useState(value !== null ? new Date(value) : null)


    useEffect(() => {
        if (value !== null) {
            const newDate = new Date(value);
            setDate(newDate);
            setYear(getYear(newDate));
            setMonth(getMonth(newDate));
            setDay(getDate(newDate));
            setChangedMonth(newDate);
        }
    }, [value]);

    const handleYearChange = (newYear) => {
        const newDate = new Date(newYear, month, day);
        setDate(newDate);
        setYear(newYear);
        setChangedMonth(newDate)
    };

    const handleMonthChange = (newMonth) => {
        const newDate = new Date(year, newMonth, day);
        setDate(newDate);
        setMonth(newMonth);
        setChangedMonth(newDate)
    };


    const handleDateChange = (selectedDate) => {
        const newYear = getYear(selectedDate);
        const newMonth = getMonth(selectedDate);
        const newDay = getDate(selectedDate);
        setChangedMonth(selectedDate)
        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
        setTimeout(() => {
            setDate(selectedDate);
        }, 0);
        onChange(selectedDate);

        setIsOpen(false);
    };


    const handlePreviousMonth = () => {
        const referenceDate = changedMonth ? new Date(changedMonth) : new Date();

        const previousDate = new Date(referenceDate);
        previousDate.setMonth(referenceDate.getMonth() - 1);

        setMonth(previousDate?.getMonth());
        setChangedMonth(previousDate);

        return previousDate;
    }


    const handleNextMonth = () => {
        const referenceDate = changedMonth ? new Date(changedMonth) : new Date();

        const nextDate = new Date(referenceDate);
        nextDate.setMonth(referenceDate.getMonth() + 1);

        setMonth(nextDate?.getMonth());
        setChangedMonth(nextDate);

        return nextDate;
    }


    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild >
                <Button
                    variant={"outline"}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        "focus:outline-none focus:ring-0",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date !== null ? format(date, "PPP") : <span className={cn("text-[13px]", placeholderClassNames)}>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2" >
                <div className="flex justify-between items-center gap-2" >
                    <Select
                        value={year}
                        onValueChange={handleYearChange}

                        className="w-full max-w-[80px]"
                    >
                        <SelectTrigger className="focus:outline-none focus:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {Array.from({ length: 50 }, (_, i) => i + 1980) // Adjust range as needed
                                .map((yearOption) => (
                                    <SelectItem key={yearOption} value={yearOption}>
                                        {yearOption}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={month}
                        onValueChange={handleMonthChange}
                        className="w-full max-w-[80px]"
                    >
                        <SelectTrigger className="focus:outline-none focus:ring-0">
                            <SelectValue>
                                {date ? format(date, "MMMM") : "Month"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                                (monthOption, index) => (
                                    <SelectItem key={index} value={index}>
                                        {monthOption}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>

                </div>
                <div className="rounded-md border">
                    <NewCalender
                        mode="single"
                        selected={date || null}
                        onSelect={handleDateChange}
                        month={changedMonth || new Date()}
                        defaultMonth={changedMonth || new Date()}
                        handlePreviousMonth={handlePreviousMonth}
                        handleNextMonth={handleNextMonth}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CustomDatePickerComponent;
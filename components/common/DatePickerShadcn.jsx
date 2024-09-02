import { format, getMonth, getYear,getDay, getDate } from 'date-fns';
import React from 'react';
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

const DatePickerShadcn = ({ value = null,  }) => {
    const [date, setDate] = React.useState();
    const [year, setYear] = React.useState(getYear(new Date()));
    const [month, setMonth] = React.useState(getMonth(new Date()));
    const [day, setDay] = React.useState(getDay(new Date()));

    const handleYearChange = (newYear) => {
        setYear(newYear);
        setDate(new Date(newYear, month, day));
    };

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
        setDate(new Date(year, newMonth, day));
    };

    const handleDateChange = (selectedDate) => {
        const newYear = getYear(selectedDate);
        const newMonth = getMonth(selectedDate);
        const newDay = getDate(selectedDate);

        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
        setDate(selectedDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <div className="flex justify-between items-center">
                    <Select
                        value={year}
                        onValueChange={handleYearChange}
                        className="w-full max-w-[80px] "
                    >
                        <SelectTrigger className="focus:!ring-0 focus:ring-offset-0">
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
                        <SelectTrigger className="focus:!ring-0 focus:ring-offset-0">
                            <SelectValue>
                                {date ? format(date, "MMMM") : "Month"}
                            </SelectValue>
                        </SelectTrigger >
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
                    <Calendar mode="single" selected={value || null} onSelect={handleDateChange} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerShadcn
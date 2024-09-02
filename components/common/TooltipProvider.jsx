import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const CustomTooltipProvider = (props) => {
    const { children, tooltipMessage } = props
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipMessage}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default CustomTooltipProvider
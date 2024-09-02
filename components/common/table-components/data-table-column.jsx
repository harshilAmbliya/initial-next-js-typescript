import React from "react";

function DataTableColumn({
    name,
    title,
    className,
}) {
    return <span className={`flex items-center overflow-words ${className}`} title={title}>{name}</span>;
}

export default DataTableColumn;
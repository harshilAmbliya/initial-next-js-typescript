import React from 'react'
import ReactSelect from "react-select"

const MultiSelectCheckboxGroup = (props) => {
    const { options, generatePlaceholder, formatGroupLabel, CustomSelectGroupComponent, handleChange, onCheckedOptions } = props
    return (
        <div>
            <ReactSelect
                options={options}
                className="w-[300px]"
                classNamePrefix='react_select'
                closeMenuOnSelect={false}
                placeholder={generatePlaceholder()}
                formatGroupLabel={formatGroupLabel}
                components={{ Option: CustomSelectGroupComponent }}
                value={null}
                onChange={handleChange}
                onCheckedOptions={onCheckedOptions}
            />
        </div>
    )
}

export default MultiSelectCheckboxGroup
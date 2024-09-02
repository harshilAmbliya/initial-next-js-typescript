
import React from 'react'
import ReactSelect from "react-select"
const MultiSelectCheckboxWithSingleValue = (props) => {
    const { options, generatePlaceholder, CustomSelectGroupComponent, handleChange, onCheckedOptions } = props
    return (
        <div className='MultiSelectCheckboxWithSingleValue'>
            <ReactSelect
                options={options}
                className="!w-[150px]"
                classNamePrefix='react_select'
                closeMenuOnSelect={false}
                placeholder={generatePlaceholder()}
                components={{ Option: CustomSelectGroupComponent }}
                value={null}
                onChange={handleChange}
                onCheckedOptions={onCheckedOptions}
            />
        </div>
    )
}

export default MultiSelectCheckboxWithSingleValue
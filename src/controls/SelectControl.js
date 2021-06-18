import React from 'react';

const SelectControl = (props) => {
    const {name, options, label, required, changeHandler} = props;
    return (
        <React.Fragment>
            <label htmlFor={name} className="form-label">{label}</label>
            <select className="form-select" name={name} required={required} aria-label={name} onChange={changeHandler}>
                    <option value='0'>---Select Status---</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>{option.title}</option>
                ))}
            </select>
        </React.Fragment>
    );
};

export default SelectControl;
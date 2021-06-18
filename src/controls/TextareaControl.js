import React from 'react';

const TextareaControl = (props) => {
    const {label, name, value, required, changeHandler} = props;
    return (
        <React.Fragment>
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea className="form-control" name={name} rows="2" value={value} required={required} onChange={changeHandler}/>
        </React.Fragment>
    );
};

export default TextareaControl;
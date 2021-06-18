import React from 'react';

const InputControl = (props) => {
    const {onChange, value, placeholder, type, name, label, required} = props;
    return (
        <React.Fragment>
            <label className="form-label">{label}</label>
            <input
                className="form-control"
                onChange={onChange}
                value={value}
                type={ type ||"text" }
                placeholder={placeholder || null}
                name={name}
                required={required || false}
            />
        </React.Fragment>
    );
};

export default InputControl;
import React from 'react';

const ButtonControl = (props) => {
    const {type, text, onClick} = props;

    return (
        <button type={type} onClick={onClick} className="btn btn-primary btn-sm">{text}</button>
    );
};

export default ButtonControl;
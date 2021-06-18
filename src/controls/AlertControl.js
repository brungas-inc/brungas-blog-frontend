import React from 'react';

const AlertControl = (props) => {
    const {text} = props;
    return (
        <div hidden={!text} className="alert alert-danger al alert-dismissible fade show" role="alert">
            <strong style={{textAlign: "center"}}>{text}!</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};

export default AlertControl;
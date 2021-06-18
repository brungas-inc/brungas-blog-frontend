import React from 'react';

export const UseForm = (props) => {
    const { children} = props;
    return (
        <form>
            <fieldset><legend>Fill Field Correctly:</legend>
                {children}
            </fieldset>
        </form>
    );
};

export default UseForm;
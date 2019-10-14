import React from "react";

const Error = ({ touched, message }) => {
    if (!touched) {
        return <div className="form-message invalid">&nbsp;</div>;
    }
    if (message) {
        return <div className="form-message invalid">{message}</div>;
    } else {
    return <div className="form-message valid">all good</div>;
    }
};

export default Error;
import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const AuthorityProtected = ({ element: Element, ...rest }) => {
    const token = Cookie.get("Authority_jwt_token");
    console.log("your authority token by is: ", token);
    return token ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default AuthorityProtected;

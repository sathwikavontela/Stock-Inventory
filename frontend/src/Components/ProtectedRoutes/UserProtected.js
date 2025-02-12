import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const UserProtected = ({ element: Element, ...rest }) => {
    const token = Cookie.get("Department_jwt_token");
    console.log("your Fic token by is: ", token);
    return token ? <Element {...rest} /> : <Navigate to="/login" replace />;
};
export default UserProtected;
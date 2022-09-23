import React  from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav.js"


const User = ({ loggedIn, logoutUser}) => {

    return (
        <>
            <Nav  loggedIn={loggedIn} logoutUser={logoutUser} />
            <Outlet />
        </>
    );
};

export default User;
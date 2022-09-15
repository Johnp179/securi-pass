import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";


const BaseElement = ({ checkIfUserLoggedIn  }) => {


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        checkIfUserLoggedIn()
        .then(userLoggedIn => {

            if(location.pathname !== "/user/vault" && userLoggedIn){
                return navigate("/user/vault");
            }

            if((location.pathname === "/user/vault" || location.pathname === "/user/profile" ) && !userLoggedIn){
                return navigate("/");
            }

        })
    
    }, [])

    return(
        <Outlet />
    )
};

export default BaseElement;
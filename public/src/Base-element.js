import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import LoadingAnimation from "./Loading-animation";
import "./scss/base-element.scss";


const BaseElement = ({ checkIfUserLoggedIn  }) => {

    const [loadingScreenDisplay, setLoadingScreenDisplay] = useState("block");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        checkIfUserLoggedIn()
        .then(userLoggedIn => {

            if(location.pathname !== "/user/vault" && userLoggedIn){
                navigate("/user/vault");
            }
            else if((location.pathname === "/user/vault" || location.pathname === "/user/profile" ) && !userLoggedIn){
                navigate("/");
            }

            setLoadingScreenDisplay("none");

        })
    
    }, [])


    return(
        <>
            <div id="loading-screen" style={{display:loadingScreenDisplay}}>
                <LoadingAnimation className="base-element" />
            </div>  
            <Outlet />
        </>
        
    )
};

export default BaseElement;
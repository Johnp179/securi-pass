import React, {useState} from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/nav.scss"

const Nav = ({ loggedIn, logoutUser}) => {

    const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const loggedOutButtonClick = () => {
        location.pathname.includes("login") ? navigate("/user/register") : navigate("/user/login");
    };


    const loggedOutButton = (
        <button id="logged-out-button" onClick={loggedOutButtonClick}>
            {location.pathname.includes("login") ? "Register" : "Login"}
        </button>
    );

    const logout = () =>{
        logoutUser();
        navigate("/");
    }
    
    const loggedInMenu = (
            <>
                <div id="desktop-menu">
                    <button className="user-icon"><FontAwesomeIcon icon={solid('user')} /> </button>
                    <div id="dropdown">
                        <div onClick={()=>navigate("/user/profile")}>Profile</div>
                        <div onClick={logout}>logout</div>
                    </div>
                </div> 
    
                <button id="mobile-button" onClick={()=>setDisplayMobileMenu(prevState=> !prevState)}>
                    {displayMobileMenu 
                     ?   <FontAwesomeIcon icon={solid('xmark')} />
                     :  <FontAwesomeIcon icon={solid('user')} />
                    }
                </button>
             
            </>
            
    );


    const mobileMenu = (
        <div id="mobile-menu">
            <div onClick={()=>navigate("/user/profile") }>Profile</div>
            <div onClick={logout}>Logout</div>
        </div>
    );


    return(
        <div id = "nav">
            <h1>SecuriPass</h1>
            {loggedIn ? loggedInMenu :loggedOutButton}
            {displayMobileMenu && mobileMenu}   
        </div>
    )
}

export default Nav;
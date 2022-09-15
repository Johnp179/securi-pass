import React from "react";
import { Link } from "react-router-dom";
import "./scss/home-page.scss"

const HomePage = ({}) => {

     return(
        <div id="home-page">
            <h1>SecuriPass</h1> 
            <Link to="user/login">Login</Link>
            <Link to="user/register" >Register</Link>
        </div>
    )
}

export default HomePage;
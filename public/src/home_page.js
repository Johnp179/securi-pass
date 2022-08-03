import React from "react";
import "./scss/home_page.scss"

function HomePage(props){

     return(
        <div id = "home-page">
                <h1>SecuriPass</h1> 

            <div id = "nav-buttons">
                <div>
                    <button onClick={()=>props.switchPage("login")}>Login</button>
                    <button onClick={()=>props.switchPage("register")}>Register</button>
                </div>
            </div>
        </div>
    )
}




export default HomePage;
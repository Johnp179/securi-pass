import React from "react";
import "./scss/nav.scss"

function Nav(props){

     return(
        <div id = "nav">
            <h1>SecuriPass</h1>
            <button onClick={props.displayLogin ? ()=>props.switchPage("register") : ()=>props.switchPage("login") }>
                {props.displayLogin ? "Register" : "Login"}
            </button>
        </div>
    )
}


export default Nav
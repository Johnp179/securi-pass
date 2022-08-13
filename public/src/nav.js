import React from "react";
import "./scss/nav.scss"

function Nav(props){

    function buttonClick(){
        if(props.router.vault){
            return;
        }

        props.router.login ? props.switchPage("register") : props.switchPage("login");
    }
    function alterButtonContent(){
        if(props.router.vault) return;
        props.router.login ? "Register" : "Login"

    }

    return(
        <div id = "nav">
            <h1>SecuriPass</h1>
            <button onClick={buttonClick}>
                {alterButtonContent()}
            </button>
        </div>
    )
}


export default Nav
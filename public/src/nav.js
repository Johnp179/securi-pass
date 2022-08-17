import React from "react";
import { Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/nav.scss"

class Nav extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayMobileMenu:false,


        }

    }

    loggedOutButtonClick(){
        this.props.router.login ? this.props.switchPage("register") : this.props.switchPage("login");
    }


    render(){

        const loggedOutButton = (
            <button id="logged-out-button" onClick={this.loggedOutButtonClick}>
                {this.props.router.login ? "Register" : "Login"}
            </button>
        );

        const loggedInMenu = (
            <div>
                 <div id="desktop-menu">
                    <button><FontAwesomeIcon className="user-icon" icon={solid('user')} /> </button>
                    <div id="dropdown">
                        <div onClick={()=>this.props.switchPage("profile")}>Profile</div>
                        <div onClick={this.props.logoutUser}>logout</div>
                    </div>
                </div> 
    
                <button id="mobile-button" onClick={()=>this.setState({displayMobileMenu:!this.state.displayMobileMenu})}>
                    {this.state.displayMobileMenu 
                     ?   <FontAwesomeIcon icon={solid('xmark')} />
                     :  <FontAwesomeIcon icon={solid('user')} />
                    }
                </button>
             
            </div>
            
        );

        const mobileMenu = (
            <div id="mobile-menu">
                <div onClick={()=>this.props.switchPage("profile")}>Profile</div>
                <div onClick={this.props.logoutUser}>Logout</div>
            </div>
        );

    return(
            <div id = "nav">
                <h1>SecuriPass</h1>
                {this.props.loggedIn ? loggedInMenu :loggedOutButton}
                {this.state.displayMobileMenu && mobileMenu}  
            </div>
        )

    }

}


export default Nav;
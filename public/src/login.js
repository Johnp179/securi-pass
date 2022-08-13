import React, {Component} from "react";
import "./scss/login.scss";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
        };


    }

    render(){

        return(
            <div id = "login">
                    <div className = "auth-form">
                        <div>
                            <label>Email</label>
                            <input type="text" id = "email-login" /> 
                            <label className = "errors error-email-login" >Email must be in a vaild format</label>
                            <label className = "errors error-email-login-server" >That email does not exist</label> 
                        </div>
        
                        <div>
                            <label>Password</label>
                            <input type="password" id = "password-login" /> 
                            <label className = "errors error-password-login" >Incorrect Password</label>
                            <label className = "errors error-attempts">Too many login attempts, please wait</label>
                        </div>
                
                        <div className = "submit-container"> 
                            <button className = "submit submit-login">Login</button>
                        </div>
                    </div>
            </div>
        )

    }
}

export default Login;

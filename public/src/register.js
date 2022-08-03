import React, {Component} from "react";
import "./scss/register.scss";


class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
        };


    }

    render(){
        return(
            <div id = "register">
                <div className = "forum">
                    <div>
                        <label className = "labels" >Username</label> 
                        <input type="text" id = "username" /> 
                            <label className = "errors error-username" >Must be at least 6 characters long</label>
                            <label className = "errors error-username-server" >That user already exists</label>
                    </div>
        
                    <div>
                        <label className = "labels" >Email</label>
                        <input type="text" id = "email-register" /> 
                            <label className = "errors error-email-register" >Email must be in a vaild format</label> 
                            <label className = "errors error-email-register-server" >That email already exists</label> 
                    </div>
            
                    <div>
                        <label className = "labels" >Password</label>
                        <input type="password" id = "password-register" /> 
                            <label className = "errors error-password-register" >Must be at least 6 characters long</label>
                            <label className = "errors error-password-register" >Must contain letters and numbers</label>
                    </div>

                    <div>
                        <label className = "labels" >Confirm Password</label>
                        <input type="password" id = "confirmPassword" />
                            <label className = "errors error-confirm-password" >Passwords must match</label>
                    </div>

                    <div className = "submit-container">
                        <button className = "submit submit-register">Register</button>
                    </div>
                </div>
        </div>
        
        )
    }
}

export default Register;
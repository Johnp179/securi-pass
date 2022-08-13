import React, {Component} from "react";
import {isEmail} from "validator"
import "./scss/register.scss";


class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorsClient:{
                username:true,
                email:false,
                password:[true, true],
                confirmPassword: false
            },

            errorsServer:{
                username:false,
                email: false
            },

            formSubmitted:false,

            style:{
                errorLabel:{
                    color:"black",
                    fontWeight:"normal",
                },        
            },

        };

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});

        if(e.target.name === "username"){

            this.setState(prevState=>({
                errorsServer:{
                    ...prevState.errorsServer,
                    username:false
                }
            }));

            if(e.target.value.length >= 6){
                this.setState(prevState =>({
                    errorsClient: {
                        ...prevState.errorsClient,
                        username:false
                    }
                }));
            }else{
                this.setState(prevState =>({
                    errorsClient:{
                        ...prevState.errorsClient,
                        username:true
                    }
                }));

            }
        }
        else if(e.target.name === "password"){


            if(e.target.value.length >= 6){
                this.setState(prevState =>({
                    errorsClient: {
                        ...prevState.errorsClient,
                        password:[false, prevState.errorsClient.password[1]]
                    }
                }));
            }else{
                this.setState(prevState =>({
                    errorsClient: {
                        ...prevState.errorsClient,
                        password:[true, prevState.errorsClient.password[1]]
                    }
                }));

            }

            const resLetter = /[a-z]/i.test(e.target.value);
            const resDigit = /\d/.test(e.target.value);
            if(resDigit && resLetter){
                this.setState(prevState =>({
                    errorsClient: {
                        ...prevState.errorsClient,
                        password:[prevState.errorsClient.password[0], false]
                    }
                }));
            }else{
                this.setState(prevState =>({
                    errorsClient: {
                        ...prevState.errorsClient,
                        password:[prevState.errorsClient.password[0], true]
                    }
                }));

            }
        }
        else if(e.target.name === "email"){

            this.setState(prevState=>({
                errorsServer:{
                    ...prevState.errorsServer,
                    email:false
                }
            }));

            if(this.state.formSubmitted){
                if(isEmail(e.target.value)){
                    this.setState(prevState => ({
                        errorsClient: {
                            ...prevState.errorsClient,
                            email:false
                        }
                    }))
                }else{
                    this.setState(prevState => ({
                        errorsClient: {
                            ...prevState.errorsClient,
                            email:true
                        }
                    }))
                }
            }
        }else if(e.target.name === "confirmPassword" && this.state.formSubmitted){
            if(e.target.value === this.state.password){
                this.setState(prevState => ({
                    errorsClient: {
                        ...prevState.errorsClient,
                        confirmPassword:false
                    }
                }))
            }else{
                this.setState(prevState => ({
                    errorsClient: {
                        ...prevState.errorsClient,
                        confirmPassword:true
                    }
                }))

            }

        }
    }
    async submitForm(e){
        e.preventDefault();

        this.setState({
            style:{
                 errorLabel:{
                    color:"red",
                    fontWeight:"bold",
                }
            },
            formSubmitted: true,
        });

        if(!isEmail(this.state.email)){
            this.setState(prevState => ({
                errorsClient: {
                    ...prevState.errorsClient,
                    email:true
                }
            }))
        }
        
        if(this.state.password !== this.state.confirmPassword){
            this.setState(prevState => ({
                errorsClient: {
                    ...prevState.errorsClient,
                    confirmPassword:true
                }
            }))

        }

        if(this.state.errorsClient.username || this.state.errorsClient.password[0]
            || this.state.errorsClient.password[1]|| !isEmail(this.state.email) || 
            this.state.password !== this.state.confirmPassword){
                // cannot send data to server so return
                return 
        
        }

        // submit the form to the server
        try{
            const response = await fetch(`${this.props.baseURL}/user/register`, {
                method: 'POST',
                credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
                headers: {
                  'Content-Type': 'application/json'
    
                },
                body: JSON.stringify({
                    username:this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            if(!response.ok){
                const error = await response.json();
                throw {
                    ...error,
                    status:response.status
                };

            } 
            const user = await response.json();
            this.props.loginUser(user.username, user.password, user.ID);
            this.props.switchPage("vault");
          

        }catch(error){
            if(error.status === 500){
                console.error("internal server error");

            }
            else if(error.status === 409){
                if(error.username){
                    this.setState(prevState=>({
                        errorsServer:{
                            ...prevState.errorsServer,
                            username:true
                        }
                    }));
                }
                if(error.email){
                    this.setState(prevState=>({
                        errorsServer:{
                            ...prevState.errorsServer,
                            email:true
                        }
                    }));

                }
         
            }
            else{
                console.error(error)
            }  
           
        }   
        
    }

    render(){
        return(
            <div id = "register">
                <form onSubmit={this.submitForm}>
                    <div>
                        <label >Username</label> 
                        <input type="text"  name="username" onChange={this.handleChange} />
                         <div className="error-container">    
                            <label style={this.state.style.errorLabel}> 
                                {this.state.errorsClient.username && "Must be at least 6 characters long"}
                            </label>
                            <label className = "error" >
                                {this.state.errorsServer.username && "That user already exists"}
                            </label>
                        </div>
                    </div>
        
                    <div>
                        <label >Email</label>
                        <input type="text"  name="email" onChange={this.handleChange} /> 
                        <div className="error-container"> 
                            <label className = "error" >
                                {this.state.errorsClient.email && " Email must be in a vaild format"}
                            </label> 
                            <label className = "error" >
                                {this.state.errorsServer.email && " That email already exists"}
                            </label> 
                        </div>
                    </div>
            
                    <div>
                        <label >Password</label>
                        <input type="password"  name="password" onChange={this.handleChange} /> 
                        <div className="error-container"> 
                            <label style={this.state.style.errorLabel} >
                                {this.state.errorsClient.password[0] && "Must be at least 6 characters long"}
                            </label>
                            <label style={this.state.style.errorLabel} >
                                {this.state.errorsClient.password[1] && "Must contain letters and numbers"}
                            </label>
                        </div>
                    </div>

                    <div>
                        <label  >Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={this.handleChange} />
                        <div className="error-container"> 
                            <label className = "error" >
                                {this.state.errorsClient.confirmPassword && "Passwords must match"}
                            </label>
                        </div>
                    </div>

                    <div className = "submit-container">
                        <button type="submit" >Register</button>
                    </div>
                </form>
        </div>
        
        )
    }
}

export default Register;
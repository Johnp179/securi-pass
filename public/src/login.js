import React, {Component} from "react";
import {isEmail} from "validator";
import "./scss/login.scss";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorsClient:{
                email:false,
            },

            errorsServer:{
                email:false,
                password:false,
                atttempts:false
            },
            formSubmitted:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});

        if(e.target.name === "email"){

            this.setState(prevState=>({
                errorsServer:{
                    ...prevState.errorsServer,
                    email:false
                }
            }));

            if(this.state.formSubmitted){
                if(isEmail(e.target.value)){
                    this.setState({
                        errorsClient:{
                            email:false
                        }
                    })
                }else{
                    this.setState({
                        errorsClient:{
                            email:true
                        }
                    })
                }
            }
        }
        else if(e.target.name === "password"){
            this.setState(prevState=>({
                errorsServer:{
                    ...prevState.errorsServer,
                    password:false
                }
            }));

        }
    }

    async submitForm(e){
        e.preventDefault();
        this.setState({formSubmitted:true});
        if(!isEmail(this.state.email)){
            this.setState({
                errorsClient:{
                    email:true
                }
            });
            return;

        }

        try{
            const response = await this.props.postData("user/login",{
                email:this.state.email,
                password:this.state.password
            })
            if(!response.ok){
                const error = await response.json();
                throw({
                    ...error,
                    status:response.status
                });
            }

            const user = await response.json();
            this.props.loginUser(user);

        }
        catch(error){
            if(error.status === 500){
                return console.error("internal server error");

            }
            if(error.status === 401){
                if(error.email){
                    return this.setState(prevState=>({
                                errorsServer:{
                                    ...prevState.errorsServer,
                                    email:true
                                }
                            }));
                }
                if(error.password){
                    return this.setState(prevState=>({
                                errorsServer:{
                                    ...prevState.errorsServer,
                                    password:true
                                }
                            }));

                }
                if(error.attempts){
                    return this.setState(prevState=>({
                                errorsServer:{
                                    ...prevState.errorsServer,
                                    attempts:true
                                }
                            }));

                }
         
            }
            
            console.error(error)
            

        }

    }

    render(){

        return(
            <div id = "login">
                    <form onSubmit={this.submitForm}>
                        <div>
                            <label>Email</label>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /> 
                            <div className="error-container">
                                <label className = "error" >
                                    {this.state.errorsClient.email && "Email must be in a vaild format"}
                                </label>
                                <label className = "error" >
                                    {this.state.errorsServer.email && "That email does not exist"}
                                </label> 
                            </div>
                        </div>
        
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}  /> 
                            <div className="error-container">
                                <label className = "error" >
                                    {this.state.errorsServer.password && "Incorrect Password"}
                                </label>
                                <label className = "error">
                                    {this.state.errorsServer.atttempts && "Too many login attempts, please wait"}
                                </label>
                            </div>
                        </div>
                
                        <div className = "submit-container"> 
                            <button type="submit" >Login</button>
                        </div>
                    </form>
            </div>
        )

    }
}

export default Login;

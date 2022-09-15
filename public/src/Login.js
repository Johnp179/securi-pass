import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';

const Login = ({ postData, loginUser }) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailErrorClient, setEmailErrorClient] = useState(false);
    const [emailErrorServer, setEmailErrorServer] = useState(false);
    const [passwordErrorSever, setPasswordErrorServer] = useState(false);
    const [attemptsErrorSever, setAttemptsErrorServer] = useState(false);
    const [formSubmitted, setForumSubmitted] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {

        if(e.target.name === "email"){
            setEmail(e.target.value);
            setEmailErrorServer(false);

            if(formSubmitted){
                isEmail(e.target.value)
                ? setEmailErrorClient(false)
                : setEmailErrorClient(true);
            }
        }
        else if(e.target.name === "password"){
            setPassword(e.target.value);
            setPasswordErrorServer(false);
        }
    }

    const submitForm = async(e) => {
        e.preventDefault();
        setForumSubmitted(true);
        if(!isEmail(email)){
            setEmailErrorClient(true);
            return;

        }

        try{
            const response = await postData("user/login",{
                email,
                password
            })
            if(!response.ok){
                const error = await response.json();
                throw({
                    ...error,
                    status:response.status
                });
            }

            const user = await response.json();
            loginUser(user);
            navigate("/user/vault");

        }
        catch(error){
            if(error.status === 500){
                console.error("internal server error");

            }
            else if(error.status === 401){
                error.email && setEmailErrorServer(true);
                error.password && setPasswordErrorServer(true);
                error.atttempts && setAttemptsErrorServer(true);
        
            }
            else{
                console.error(error)
            }

        }

    }


    return(
        <div id = "login">
            <form onSubmit={submitForm}>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={handleChange} /> 
                        <div className="error-container">
                            <label className = "error" >
                                {emailErrorClient && "Email must be in a vaild format"}
                            </label>
                            <label className = "error" >
                                {emailErrorServer && "That email does not exist"}
                            </label> 
                        </div>
                    </div>
        
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handleChange}  /> 
                        <div className="error-container">
                            <label className = "error" >
                                {passwordErrorSever && "Incorrect Password"}
                            </label>
                            <label className = "error">
                                {attemptsErrorSever && "Too many login attempts, please wait"}
                            </label>
                        </div>
                    </div>
                
                    <button type="submit" >Login</button>
                    
            </form>
        </div>
    )
    
}

export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import LoadingAnimation from "./Loading-animation";

const Login = ({ postData, loginUser }) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailErrorClient, setEmailErrorClient] = useState(false);
    const [emailErrorServer, setEmailErrorServer] = useState(false);
    const [passwordErrorServer, setPasswordErrorServer] = useState(false);
    const [attemptsErrorServer, setAttemptsErrorServer] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [componentToDisplay, setComponentToDisplay] = useState("submit-button");
    const navigate = useNavigate();


    const handleChange = e => {

        if(e.target.name === "email"){
            setEmail(e.target.value);
            emailErrorServer && setEmailErrorServer(false);

            if(formSubmitted){
                isEmail(e.target.value)
                ? setEmailErrorClient(false)
                : setEmailErrorClient(true);
            }
        }
        else if(e.target.name === "password"){
            setPassword(e.target.value);
            passwordErrorServer && setPasswordErrorServer(false);
        }
    }

    const submitForm = async(e) => {
        e.preventDefault();
        !formSubmitted && setFormSubmitted(true);
        if(!isEmail(email)) return setEmailErrorClient(true);
          
        try{
            setComponentToDisplay("loading");
            const response = await postData("user/login",{
                email,
                password
            })
            
            if(!response.ok){
                if(response.status === 401){
                    const error = await response.json();
                    error.email && setEmailErrorServer(true);
                    error.password && setPasswordErrorServer(true);
                    error.attempts && setAttemptsErrorServer(true);
                    return setComponentToDisplay("submit-button");
        
                }
                throw new Error(`Server responded with status code: ${response.status}`);
                
            }
     
            const user = await response.json();
            loginUser(user);
            navigate("/user/vault");

        }
        catch(error){
            console.error(error)
            setComponentToDisplay("error");
            setTimeout(()=>setComponentToDisplay("submit-button"), 4000);
        }

    }

    const updateDOM = () => {

        switch(componentToDisplay){
            case "submit-button":
                return <button type="submit" >Login</button>;
            case "loading":
                return <LoadingAnimation className="login-and-register" />;
            case "error":
                return <p className="error-message">An error occurred, please try again</p>;
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
                                {passwordErrorServer && "Incorrect Password"}
                            </label>
                            <label className = "error">
                                {attemptsErrorServer && "Too many login attempts, please try again later"}
                            </label>
                        </div>
                    </div>

                    {updateDOM()}
                    
            </form>
            <p>No Account? Click <Link to="/user/register">here</Link> to register</p>
        </div>
    )
    
}

export default Login;

import React, { useState} from "react";
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from "react-router-dom";


const Register = ({ postData, loginUser }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameErrorClient, setUsernameErrorClient] = useState(true);
    const [emailErrorClient, setEmailErrorClient] = useState(false);
    const [passwordErrorClient, setPasswordErrorClient] = useState([true, true]);
    const [confirmPasswordErrorClient, setConfirmPasswordErrorClient] = useState(false);
    const [usernameErrorServer, setUsernameErrorServer] = useState(false);
    const [emailErrorServer, setEmailErrorServer] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errorLabelStyle, setErrorLabelStyle] = useState({color:"black",fontWeight:"normal"});
    const navigate = useNavigate();

    const handleChange = (e) => {

        if(e.target.name === "username"){
            setUsername(e.target.value);
            setUsernameErrorServer(false);

            if(e.target.value.length >= 6){
                setUsernameErrorClient(false);
            }

            e.target.value.length >= 6 
            ? setUsernameErrorClient(false) 
            : setUsernameErrorClient(true);


        }
        else if(e.target.name === "email"){
            setEmail(e.target.value);
            setEmailErrorServer(false);

            if(formSubmitted){
                isEmail(e.target.value) 
                ? setEmailErrorClient(false) 
                : setEmailErrorClient(true)
            }

        }
        else if(e.target.name === "password"){
            setPassword(e.target.value);

            if(e.target.value.length >= 6){
                setPasswordErrorClient(prevState => {
                    prevState[0] = false;
                    return [...prevState];
    
                })
            }else{
                setPasswordErrorClient(prevState => {
                    prevState[0] = true;
                    return [...prevState];
    
                })
            }

            const resLetter = /[a-z]/i.test(e.target.value);
            const resDigit = /\d/.test(e.target.value);

            if(resDigit && resLetter){
                setPasswordErrorClient(prevState => {
                    prevState[1] = false;
                    return [...prevState];
                })

            }else{
                setPasswordErrorClient(prevState => {
                    prevState[1] = true;
                    return [...prevState];
    
                })

            }



        }
        else if(e.target.name === "confirmPassword"){
            setConfirmPassword(e.target.value);
            if(formSubmitted){
                e.target.value === password
                ? setConfirmPasswordErrorClient(false)
                : setConfirmPasswordErrorClient(true);
            }

        }

    };

    const submitForm = async(e) => {
        e.preventDefault();
        setErrorLabelStyle({color:"red", fontWeight:"bold"});
        setFormSubmitted(true);
        !isEmail(email) && setEmailErrorClient(true);
        password !== confirmPassword && setConfirmPasswordErrorClient(true);

        if(usernameErrorClient || passwordErrorClient[0]
        || passwordErrorClient[1]|| !isEmail(email) || 
        password !== confirmPassword){
            // cannot send data to server so return
            return 
        }
  
        try{
            const response = await postData("user/register",{
                username,
                email,
                password
            });
                
            if(!response.ok){
                const error = await response.json();
                throw {
                    ...error,
                    status:response.status
                };
            } 
            const user = await response.json();
            loginUser(user);
            navigate("/user/vault");
          

        }catch(error){
            if(error.status === 500){
                console.error("internal server error");
            }
            else if(error.status === 409){
                error.username && setUsernameErrorServer(true);
                error.email && setEmailErrorServer(true);
            }
            else{
                console.error(error)
            }

        }

    };

    return(
        <div id = "register">
            <form onSubmit={submitForm}>
                <div className="section">
                    <label >Username</label> 
                    <input type="text"  name="username" onChange={handleChange} />
                    <div className="error-container">    
                        <label style={errorLabelStyle}> 
                            {usernameErrorClient && "Must be at least 6 characters long"}
                        </label>
                        <label className = "error" >
                            {usernameErrorServer && "That user already exists"}
                        </label>
                    </div>
                </div>
        
                <div className="section">
                    <label >Email</label>
                    <input type="text" name="email" onChange={handleChange} /> 
                    <div className="error-container"> 
                        <label className = "error" >
                            {emailErrorClient  && " Email must be in a vaild format"}
                        </label> 
                        <label className = "error" >
                            {emailErrorServer  && " That email already exists"}
                        </label> 
                    </div>
                </div>
            
                <div className="section">
                    <label >Password</label>
                    <input type="password"  name="password" onChange={handleChange} /> 
                    <div className="error-container"> 
                        <label style={errorLabelStyle} >
                            {passwordErrorClient[0] && "Must be at least 6 characters long"}
                        </label>
                        <label style={errorLabelStyle} >
                            {passwordErrorClient[1] && "Must contain letters and numbers"}
                        </label>
                    </div>
                </div>

                <div className="section">
                    <label  >Confirm Password</label>
                    <input type="password"  name="confirmPassword" onChange={handleChange} />
                    <div className="error-container"> 
                        <label className = "error" >
                            {confirmPasswordErrorClient && "Passwords must match"}
                        </label>
                    </div>
                </div>

       
                <button type="submit" >Register</button>
              
            </form>
        </div>
        
    )
}


export default Register;
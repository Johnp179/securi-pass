import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import "./scss/app.scss";
import BaseElement from "./Base-element.js";
import User from "./User.js";
import HomePage from "./Home-page.js"
import Login from "./Login.js";
import Register from "./Register.js";
import Vault from "./Vault.js";
import Profile from "./Profile.js";
import ErrorPage from "./Error-page";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "/";

const getData = url => {
    return fetch(`${baseURL + url}`, {
        credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
    });

}

const postData = (url, data) => {
    return fetch(`${baseURL + url}`, {
        method: 'POST',
        credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(data),
    });

}

const updateData = (url, data) => {
    return fetch(`${baseURL + url}`, {
        method: 'PUT',
        credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    });

}

const deleteData = url => {
    return fetch(`${baseURL + url}`, {
        method: 'DELETE',
        credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
    });

}


const App = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);


    const checkIfUserLoggedIn = async() => {

        try{
            const response = await getData("user/check-for-logged-in-user");
            if(!response.ok) throw new Error(`Server responded with status code: ${response.status}`);
            const user = await response.json();
            loginUser(user);
            return true;

        }catch(error){
            console.error(error);
            return false;
         
        }

    }

    const loginUser = user => {
        setUsername(user.username);
        setEmail(user.email);
        setUserID(user.userID)
        setLoggedIn(true);
    }

    const logoutUser = async() => {
        try{
            await getData("user/logout");
            setUsername("");
            setEmail("");
            setUserID("");
            setLoggedIn(false);
           
            
        }catch(error){
            console.error(error)
        }

    }

    return(
 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseElement checkIfUserLoggedIn={checkIfUserLoggedIn} />}> 
                    <Route index element={<HomePage checkIfUserLoggedIn={checkIfUserLoggedIn} />} />
                    <Route path="user" element={<User loggedIn={loggedIn} logoutUser={logoutUser} checkIfUserLoggedIn={checkIfUserLoggedIn}  />} >
                        <Route path="register" element={<Register postData={postData} loginUser={loginUser} />} />
                        <Route path="login" element={<Login  postData={postData}  loginUser={loginUser}   />} />
                        <Route path="profile" element={<Profile  username={username} email={email}      />} />
                        <Route path="vault" element={<Vault getData={getData} postData={postData} deleteData={deleteData} updateData={updateData} userID={userID} />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    
    );
        
}

export default App;


import React, { Component} from "react";
import "./scss/app.scss";
import Nav from "./nav.js";
import HomePage from "./home_page.js"
import Login from "./login.js";
import Register from "./register.js";
import Vault from "./vault.js";
import { faBedPulse, faLessThan } from "@fortawesome/free-solid-svg-icons";


class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            router:{
                homePage:false,
                login: false,
                register: true,
                vault:false
            },
            username: "",
            email: "",
            userID:"",
    
        };

        this.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
        this.switchPage = this.switchPage.bind(this);
        this.loginUser = this.loginUser.bind(this);

    }
  
    switchPage(dest){
      
        if(dest === "register"){
            return this.setState({
                router:{
                    homePage:false,
                    login:false,
                    register: true,
                    vault:false
                }
            });
        }
        if(dest === "login"){
            return this.setState({
                router:{
                    homePage:false,
                    login:true,
                    register: false,
                    vault:false

                }
            });
        }
        if(dest === "vault"){
            return this.setState({
                router:{
                    homePage:false,
                    login:false,
                    register: false,
                    vault:true

                }
            });
        }

     
    }

    loginUser(username, email, userID){
        this.setState({
            username,
            email,
            userID
        })
    }

    render(){

        return(
        <div className = "app">
            <Nav router={this.state.router} switchPage={this.switchPage} />
            {this.state.router.homePage && <HomePage switchPage={this.switchPage} />}
            {this.state.router.login && <Login />}
            {this.state.router.register && <Register baseURL={this.baseURL} switchPage={this.switchPage} loginUser={this.loginUser} />}
            {this.state.router.vault && <Vault userID={this.state.userID} baseURL={this.baseURL} />}
        </div>
    
        );
        
    }
}

export default App;
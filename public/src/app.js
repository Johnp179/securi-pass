import React, { Component} from "react";
import "./scss/app.scss";
import Nav from "./nav.js";
import HomePage from "./home_page.js"
import Login from "./login.js";
import Register from "./register.js";
import Vault from "./vault.js";
import Profile from "./profile.js";


class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            router:{
                homePage:true,
                login: false,
                register: false,
                profile:false,
                vault:false
            },
            loggedIn:false,
            username: "",
            email: "",
            userID:"",
    
        };

        this.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "/";
        this.switchPage = this.switchPage.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.postData = this.postData.bind(this);
        this.getData = this.getData.bind(this);
        this.logoutUser = this.loginUser.bind(this);

    }

    async componentDidMount(){

        try{
            const response = await this.getData("user/check-for-logged-in-user");
            if(!response.ok)throw {status:response.status};
            const user = await response.json();
            this.loginUser(user);

        }catch(error){
            console.error(error);
         
        }

    }
  
    switchPage(dest){

        const router = {
            homePage:false,
            login: false,
            register: false,
            profile:false,
            vault:false
        };
        router[dest] = true;
        this.setState({router})
       
    }

    loginUser(user){
        this.setState({
            ...user,
            loggedIn:true
        });
        this.switchPage("vault");
    }

    async logoutUser(){
        try{
            await this.props.getData("user/logout");
            this.switchPage("homePage");
            this.setState({
                username:"",
                email:"",
                userID:"",
                loggedIn:false
            });
            
        }catch(error){
            console.error(error)
        }

    }
    getData(url){
        return fetch(`${this.baseURL}${url}`, {
            credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
        });

    }
    postData(url, data){
        return fetch(`${this.baseURL}${url}`, {
            method: 'POST',
            credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
            headers: {
              'Content-Type': 'application/json'

            },
            body: JSON.stringify(data),
        });

    }

    render(){

        return(
        <div className = "app">
            <Nav router={this.state.router} loggedIn={this.state.loggedIn} switchPage={this.switchPage} logoutUser={this.logoutUser} getData={this.getData}  />
            {this.state.router.homePage && <HomePage switchPage={this.switchPage} />}
            {this.state.router.login && <Login postData={this.postData} switchPage={this.switchPage} loginUser={this.loginUser}  />}
            {this.state.router.register && <Register postData={this.postData} switchPage={this.switchPage} loginUser={this.loginUser} />}
            {this.state.router.profile && <Profile username={this.state.username} email={this.state.email}  />}
            {this.state.router.vault && <Vault getData={this.getData} postData={this.postData} userID={this.state.userID} baseURL={this.baseURL} />}
        </div>
    
        );
        
    }
}

export default App;
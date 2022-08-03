import React, { Component} from "react";
import "./scss/app.scss";
import Nav from "./nav.js";
import HomePage from "./home_page.js"
import Login from "./login.js";
import Register from "./register.js";


class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            router:{
                homePage:true,
                login: false,
                register: false,
                },
    
        };

        this.switchPage = this.switchPage.bind(this);

    }
  
    switchPage(dest){
        let result;

        if(dest === "register"){
            result = {
                homePage:false,
                login:false,
                register: true
            };
        }
        else if(dest === "login"){
            result = {
                homePage:false,
                login:true,
                register: false
            };
        }

        this.setState({
            router:result
        });
    }



    render(){

        return(
        <div className = "app">
            <Nav  displayLogin={this.state.router.login} switchPage={this.switchPage} />
            {this.state.router.homePage && <HomePage switchPage={this.switchPage} />}
            {this.state.router.login && <Login />}
            {this.state.router.register && <Register />}
        </div>
    
        );
        
    }
}

export default App;
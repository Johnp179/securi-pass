import React, {Component} from "react";
import "./scss/profile.scss";

class Profile extends Component{

    constructor(props){
        super(props);
    
    }


    render(){

        return(
            <div id = "profile">
                <form>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" value={this.props.username} readOnly /> 
                    </div>
            
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" value={this.props.email} readOnly /> 
                    </div>
                </form>      
            </div>
        );
    }

}


export default Profile;

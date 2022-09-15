import React from "react";


const Profile = ({ username, email }) => {

    return(
        <div id = "profile">
            <form>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} readOnly /> 
                </div>
            
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={email} readOnly /> 
                </div>
            </form>      
        </div>
    );
    

}


export default Profile;

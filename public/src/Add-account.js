import React, { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/add-account.scss";
import LoadingAnimation from "./Loading-animation";


const Form = ({ addAccount, setComponentToDisplay }) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [emptyFieldsErrorVisibility, setEmptyFieldsErrorVisibility] = useState("hidden");
    const [passwordVisible, setPasswordVisible] = useState(false);

      
    const handleChange = e => {
        if(e.target.name === "name"){
            setName(e.target.value);
            if(e.target.value && password)setEmptyFieldsErrorVisibility("hidden");

        }else if(e.target.name === "password"){
            setPassword(e.target.value);
            if(name && e.target.value)setEmptyFieldsErrorVisibility("hidden");
        }

       
    };

    const submitForm = async(e, action) => {
        e.preventDefault();
        if(action === "submit"){
            if(!name || !password) return setEmptyFieldsErrorVisibility("visible");
            setComponentToDisplay("loading");
            const success = await addAccount(name, password);
            if(success){
                setName("");
                setPassword("");
                setComponentToDisplay("button");
                
               
            }else{
                setComponentToDisplay("error")
                setName("");
                setPassword("");
                setTimeout(()=>setComponentToDisplay("button"), 4000);
                
            }
            return 
        }
        //action is cancel
        setName("");
        setPassword("");
        setEmptyFieldsErrorVisibility("hidden");
        setComponentToDisplay("button");
        
    
    };

    const showPassword = e => {
        e.preventDefault();
        setPasswordVisible(prevState => !prevState);

    }

    return(

    <form>
        <h3 className="title">Add Account</h3>
        <div className="content">
            <div className="inputs">
                <label>Name</label>
                <input value={name} name="name" onChange={handleChange} />
                <label>Password</label>
                <div className="password-container">
                    <input value={password} name="password" type={passwordVisible ? "text" : "password"} onChange={handleChange} />
                    <button onClick={e => showPassword(e)} >
                        {passwordVisible ? 
                        <FontAwesomeIcon icon={solid('eye')}/> : 
                        <FontAwesomeIcon icon={solid('eye-slash')}/>}
                    </button>
                </div>
            </div>
            <p className="empty-fields-error" style={{visibility: emptyFieldsErrorVisibility}}>Please fill out both fields</p>
            <div className="submit-container">
                <button onClick={e => submitForm(e, "submit")} >
                    <FontAwesomeIcon icon={solid('floppy-disk')}/> 
                </button>
                <button onClick={e => submitForm(e, "cancel")} >
                    <FontAwesomeIcon icon={solid('rectangle-xmark')}/>
                </button>
            </div>
        </div>
    </form>


    );

};


const AddAccount = ({ addAccount }) => {

    const [componentToDisplay, setComponentToDisplay] = useState("button");
   
    const updateDOM = () => {
        switch(componentToDisplay){
            case "loading":
                return <LoadingAnimation className="add-account" />;
            case "error":
                return <h1 className="error-message">
                            An error occurred while updating the database,please try again.
                        </h1>;
            case "form":
                return <Form addAccount={addAccount} setComponentToDisplay={setComponentToDisplay} />;
            case "button":
                return <button className="trigger-add-account-window" 
                        onClick={() => setComponentToDisplay("form")}>
                            Add Account
                        </button>;
            
        }


    };

    return(
        <div id = "add-account">
            {updateDOM()}
        </div>     
    );
}


export default AddAccount;

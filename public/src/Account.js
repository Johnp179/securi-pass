import React, { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import LoadingAnimation from "./Loading-animation";
import "./scss/account.scss";



const Account = ({ id, index, name, password, updateAccount, deleteAccount }) => {

    const [mutatingName, setMutatingName] = useState(name);
    const [mutatingPassword, setMutatingPassword] = useState(password);
    const [updateMode, setUpdateMode] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [componentToDisplay, setComponentToDisplay] = useState("icons");

    const handleChange = (e) => {
        e.target.name === "name" && setMutatingName(e.target.value);
        e.target.name === "password" && setMutatingPassword(e.target.value);
    } 

    const update = async() => {
        setComponentToDisplay("loading");
        setUpdateMode(false);
        const success = await updateAccount(mutatingName, mutatingPassword, id, index);
        if(success) return setComponentToDisplay("icons");
    
        //error occurred
        setComponentToDisplay("error");
        setTimeout(()=>setComponentToDisplay("icons"), 4000);
         
       
    }

    const remove = async() => {
        setComponentToDisplay("loading");
        setRemoveMode(false);
        const success = await deleteAccount(id, index);
        if(!success){
            setComponentToDisplay("error");
            setTimeout(()=>setComponentToDisplay("icons"), 4000);
        }
       
         
    }

    const cancelUpdate = () => {
        setMutatingName(name);
        setMutatingPassword(password);
        setUpdateMode(false);

    }
    
    const generateIcons = () => {
        if(updateMode){
            return (
                    <>
                        <button onClick={update} >
                            <FontAwesomeIcon icon={solid('floppy-disk')}/> 
                        </button>
                        <button onClick={cancelUpdate}>
                            <FontAwesomeIcon icon={solid('rectangle-xmark')}/>
                        </button>
                    </>
            );
        }
        if(removeMode){
            return (
                    <>
                        <button onClick={remove} >
                            <FontAwesomeIcon icon={solid('check')}/>
                        </button>
                        <button onClick={() => setRemoveMode(false)}>
                            <FontAwesomeIcon icon={solid('xmark')} />
                        </button>

                    </>
            );
        }
        return (
            <>
                <button onClick={()=>setUpdateMode(true)}>
                    <FontAwesomeIcon icon={solid('pen-to-square')} />
                </button>
                <button onClick={()=>setRemoveMode(true)} >
                    <FontAwesomeIcon  icon={solid('trash-can')} />
                </button>
            </>
        );
    }


    const updateDOM = () => {

        switch(componentToDisplay){
            case "icons":
                return <div className="icon-container" >{generateIcons()}</div>;
            case "loading":
                return <LoadingAnimation className="account" />;
            case "error":
                return <p className="error-message">An error occurred, please try again</p>;
        }
    }
  
    return(
        <div id = "account">
            <div className="inputs">
                <label>Name</label>
                <input value={mutatingName} type="text" className={updateMode ? "editable" : undefined}  name="name" readOnly={updateMode ? false: true} onChange={handleChange} />
                <label>Password</label>
                <div className="password-container">
                    <input value={mutatingPassword} name="password" type={passwordVisible ? "text" : "password"}  className={updateMode ? "editable" : undefined}  readOnly={updateMode ? false: true} onChange={handleChange} />
                    <button onClick={() => setPasswordVisible(prevState => !prevState)} >
                        {passwordVisible ? 
                        <FontAwesomeIcon icon={solid('eye')}/> : 
                        <FontAwesomeIcon icon={solid('eye-slash')}/>}
                    </button>
                </div>
            </div>
            <label className="edit-and-delete-label" style={{visibility: `${updateMode || removeMode ? "visible" : "hidden"}`}} >
                {updateMode ? "Edit the fields and hit save." : "Are you sure?"}
            </label>
            {updateDOM()}
            
        </div>
    );
    
}


export default Account;

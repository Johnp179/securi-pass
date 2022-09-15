import React, { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/account.scss";

const Account = ({ id, index, name, password, updateAccount, deleteAccount }) => {

    const [mutatingName, setMutatingName] = useState(name);
    const [mutatingPassword, setMutatingPassword] = useState(password);
    const [updateMode, setUpdateMode] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);

    const handleChange = (e) => {
        e.target.name === "name" && setName(e.target.value);
        e.target.name === "password" && setPassword(e.target.value);
    } 

    const update = async() => {
        const success = await updateAccount(mutatingName, mutatingPassword, id, index);
        if(success) setUpdateMode(false);
        //handle error somehow
    }

    const remove = async() => {
        const success = await deleteAccount(id, index);
        if(success) setRemoveMode(false);
        //handle error somehow
         
    }

    const cancelUpdate = () => {
        setMutatingName(name);
        setMutatingPassword(password);
        setUpdateMode(false);

    }

    const alterEditAndDeleteLabel = () => {
        if(updateMode) return "Edit the fields and hit save.";
        if(removeMode) return "Are you sure?";
        return "";
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
                            <FontAwesomeIcon icon={solid('check')} />
                        </button>
                        <button onClick={()=>setRemoveMode(false)}>
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

  
    return(
        <div id = "account">
            <div className="inputs">
                <label>Name</label>
                <input value={name} name="name" readOnly={updateMode ? false: true} onChange={handleChange} />
                <label>Password</label>
                <input value={password} name="password" readOnly={updateMode ? false: true} onChange={handleChange} />
            </div>
            <label className="edit-and-delete-label">{alterEditAndDeleteLabel()}</label>
            <div className="icon-container" >{generateIcons()}</div>
        </div>
    );
    
}


export default Account;

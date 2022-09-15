import React, { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/add-account.scss";


const Form = ({ name, password, handleChange, submitForm }) => {

    return(

        <form>
        <h3 className="title">Add Account</h3>
        <div className="content">
            <div className="inputs">
                <label>Name</label>
                <input value={name} name="name" onChange={handleChange} />
                <label>Password</label>
                <input type="password" value={password} name="password" onChange={handleChange} />
            </div>

            <div className="submit-container">
                <button onClick={e => submitForm(e, "submit")} >
                     <FontAwesomeIcon className="icons"  icon={solid('check')} />
                </button>
                <button onClick={e => submitForm(e, "cancel")} > 
                    <FontAwesomeIcon className="icons"  icon={solid('xmark')}  />
                </button>
            </div>
        </div>
    </form>


    );

};

const TriggerAddAccountWindow = ({ setDisplayPostForm }) => {

    return(
        <button className="trigger-add-account-window" 
        onClick={()=>setDisplayPostForm(true)}>
            Add Account
        </button>
    );

};

const AddAccount = ({ addAccount }) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [displayPostForm, setDisplayPostForm] = useState(false);
  
    const handleChange = (e) => {
        e.target.name === "name" && setName(e.target.value);
        e.target.name === "password" && setPassword(e.target.value);
    }

    const submitForm = async(e, action) => {
        e.preventDefault();
        if(action === "submit"){
            const success = await addAccount(name, password);
            if(success){
                setName("");
                setPassword("");
                setDisplayPostForm(false);
            }else{
                // post some error message
            }
            return
        }
        //action is cancel
        setName("");
        setPassword("");
        setDisplayPostForm(false);
        
    
    }

    // const form = (
    //     <form>
    //         <h3 className="title">Add Account</h3>
    //         <div className="content">
    //             <div className="inputs">
    //                 <label>Name</label>
    //                 <input value={name} name="name" onChange={handleChange} />
    //                 <label>Password</label>
    //                 <input type="password" value={password} name="password" onChange={handleChange} />
    //             </div>

    //             <div className="submit-container">
    //                 <button onClick={e => submitForm(e, "submit")} >
    //                      <FontAwesomeIcon className="icons"  icon={solid('check')} />
    //                 </button>
    //                 <button onClick={e => submitForm(e, "cancel")} > 
    //                     <FontAwesomeIcon className="icons"  icon={solid('xmark')}  />
    //                 </button>
    //             </div>
    //         </div>
    //     </form>
    // );

    // const triggerAddAccountWindow = (
    //     <button className="trigger-add-account-window" 
    //     onClick={()=>setDisplayPostFor(true)}>
    //         Add Account
    //     </button>
    // );



    return(
        <div id = "add-account">
            {displayPostForm ? <Form name={name} password={password} handleChange={handleChange} submitForm={submitForm} /> : <TriggerAddAccountWindow setDisplayPostForm={setDisplayPostForm}  /> }
        </div>     
    )
}


export default AddAccount;

import React, {useState, useEffect} from "react";
import Account from "./Account.js";
import AddAccount from "./Add-account.js";
import "./scss/vault.scss";

const Vault = ({getData, postData, updateData, deleteData, userID}) => {

    const [accounts, setAccounts] = useState([]);

    useEffect(()=>{

        const fetchAccounts = async() =>{
            try{
                if(userID){
                    const response = await getData(`account/get-all-by-user/${userID}`);
                    if(!response.ok) throw new Error(`Server responded with status code: ${response.status}`);
                    const accounts = await response.json();
                    setAccounts(accounts);
                }
            }catch(error){
                console.error(error);
             
            }

        };

        fetchAccounts();

    },[userID]);

    const addAccount = async(name, password)=>{

        try{
            const response = await postData(`account/add/${userID}`,{
                name,
                password
            });
            if(!response.ok) throw new Error(`Server responded with status code: ${response.status}`);
            const newAccount = await response.json();
            setAccounts(prevAccounts => [...prevAccounts, {...newAccount, password}])
            return true; //true means that the database was updated

        }catch(error){
            console.error(error);
            return false; //false means that the database was not updated
        }

    };

    const updateAccount = async(name, password, id, index)=>{

        try{
            const response = await updateData(`account/update/${id}`,{
                name,
                password
            });
            if(!response.ok) throw new Error(`Server responded with status code: ${response.status}`);
            setAccounts(prevAccounts =>{
                prevAccounts[index].name = name;
                prevAccounts[index].password = password;
                return [...prevAccounts];

            })
            return true; //true means that the database was updated

        }catch(error){
            console.error(error);
            return false; //false means that the database was not updated
        }

    };

    const deleteAccount = async(id, indexToRemove)=>{

        try{
            const response = await deleteData(`account/delete/${id}`);
            if(!response.ok) throw new Error(`Server responded with status code: ${response.status}`);
            setAccounts(prevAccounts => prevAccounts.filter((account, index) => index != indexToRemove ))
            return true; //true means that the database was updated

        }catch(error){
            console.error(error);
            return false; //false means that the database was not updated
        }

    };


    return(
        <div id="vault">
            <div id="user-accounts">
                {accounts.map((account, index) =>
                    <Account key={account._id} name={account.name} password={account.password} 
                    id={account._id} index={index} updateAccount={updateAccount} deleteAccount={deleteAccount} />
                )}
            </div>
            <AddAccount addAccount={addAccount} />
        </div>
    )

    
}

export default Vault;

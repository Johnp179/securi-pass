import React, {Component} from "react";
import Account from "./account.js";
import AddAccount from "./add_account.js";
import "./scss/vault.scss";

class Vault extends Component{

    constructor(props){
        super(props);
        this.state = {
            accounts:[],
        };

        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.addAccount = this.addAccount.bind(this);

    }
    async componentDidMount(){
        try{
            const response = await fetch(`${this.props.baseURL}/account/get-all`);
            if(!response.ok) throw {status:response.status};
            const accounts = await response.json();
            accounts.map(account => {
                account.editSuccess = false;
                return account;
            })
            this.setState({accounts});

        }catch(error){
            if(error.status === 500) return console.error("internal server error");
            if(error.status === 401) return console.error("unauthorized");
            console.error(error);
         
        }


    }

      

    async addAccount(name, password){
        try{
            const response = await fetch(`${this.props.baseURL}/account/add`, {
                method: 'POST',
                credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
                headers: {
                  'Content-Type': 'application/json'
    
                },
                body: JSON.stringify({
                    name,
                    password
                })
            });
            if(!response.ok) throw {status:response.status};
            const newAccount = await response.json();
            this.setState(prevState =>({accounts:[...prevState.accounts, {...newAccount, password}]}));
            return true; //true means that the database was updated

        }catch(error){
            if(error.status === 500){
                console.error("internal server error");
            }else{
                console.error(error);
            }
            return false; //false means that the database was not updated
        }

    }


    async update(name, password , id, index){
        try{
            const response = await fetch(`${this.props.baseURL}/account/update/${id}`, {
                method: 'PUT',
                credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
                headers: {
                  'Content-Type': 'application/json'
    
                },
                body: JSON.stringify({
                    name,
                    password
                })
            });
            if(!response.ok) throw {status:response.status};
            this.setState(prevState =>{
                prevState.accounts[index].name = name;
                prevState.accounts[index].password = password;
                return {accounts:prevState.accounts};
            });
            return true; //true means that the database was updated

        }catch(error){
            if(error.status === 500){
                console.error("internal server error");
            }else if(error.status === 404){
                console.error("Document pertaining to that ID could not be found");
            }else{
                console.error(error);
            }

            return false; //false means that the database was not updated
        }

    }

    async delete(id, index){
        try{
            const response = await fetch(`${this.props.baseURL}/account/delete/${id}`, {
                method: 'DELETE',
                credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
    
            });
            if(!response.ok) throw {status:response.status};
            this.setState(prevState =>{
                prevState.accounts.splice(index, 1);
                return{
                    accounts:prevState.accounts
                };
            });
            return true; //true means that the database was updated

        }catch(error){
            if(error.status === 500){
                console.error("internal server error");
            }else if(error.status === 404){
                console.error("Document pertaining to that ID could not be found");
            }else{
                console.error(error);
            }
            
            return false; //false means that the database was not updated
        }

    }
 
    render(){

        return(
            <div>
                <div id = "vault">
                    {this.state.accounts.map((account, index) =>
                        <Account key={account._id} name={account.name} password={account.password} 
                        id={account._id} index={index} update={this.update} delete={this.delete} />
                    )}
                </div>
                <AddAccount addAccount={this.addAccount} />
            </div>
        )

    }
}

export default Vault;

import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/account.scss";

class Account extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            password: props.password,
            id:props.id,
            index:props.index,
            edit:false,
            delete: false,
    
   
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    handleNameChange(e){
        this.setState({name:e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }


    async updateAccount(){
        const success = await this.props.update(this.state.name, this.state.password, this.state.id, this.state.index);
        if(success) this.setState({edit:false});
        
        
    }

    async deleteAccount(){
        const success = await this.props.delete(this.state.id, this.state.index);
        if(success) this.setState({delete:false});
         
    }

    alterEditAndDeleteLabelText(){
        if(this.state.edit) return "Edit the fields and hit save";
        if(this.state.delete) return "Are you sure?";
        return "";
    }
    generateIcons(){
        if(this.state.edit){
            return (
                    <div>
                        <FontAwesomeIcon className="icons"  icon={solid('floppy-disk')}
                         onClick={this.updateAccount} />
                        <FontAwesomeIcon className="icons"  icon={solid('rectangle-xmark')} 
                        onClick={()=>this.setState({edit:false})} />
                    </div>
            );
        }
        if(this.state.delete){
            return (
                    <div>
                        <FontAwesomeIcon className="icons"  icon={solid('check')} 
                        onClick={this.deleteAccount} />
                        <FontAwesomeIcon className="icons"  icon={solid('xmark')} 
                        onClick={()=>this.setState({delete:false})}/>
                    </div>
            );
        }
        return (
            <div>
                <FontAwesomeIcon className="icons" icon={solid('pen-to-square')} 
                onClick={()=>this.setState({edit:true})} />
                <FontAwesomeIcon className="icons"  icon={solid('trash-can')} 
                onClick={()=>this.setState({delete:true})} />
            </div>
        );
    }

    render(){
        return(
            <div id = "account">
                <label>Name</label>
                <input value={this.state.name} readOnly={this.state.edit ? false: true}  onChange={this.handleNameChange} />
                <label>Password</label>
                <input value={this.state.password} readOnly={this.state.edit ? false: true} onChange={this.handlePasswordChange} />
                <label>{this.alterEditAndDeleteLabelText()}</label>
                <div className="icon-container" >
                    {this.generateIcons()}
                </div>
            </div>
        );
    }
}


export default Account;

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
            edit:false,
            delete: false,
    
   
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    async updateAccount(){
        const success = await this.props.update(this.state.name, this.state.password, this.props.id, this.props.index);
        if(success) this.setState({edit:false});
        
        
    }

    async deleteAccount(){
        const success = await this.props.delete(this.props.id, this.props.index);
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
                        <button onClick={this.updateAccount} ><FontAwesomeIcon  icon={solid('floppy-disk')}/> </button>
                        <button onClick={()=>this.setState({edit:false})}><FontAwesomeIcon icon={solid('rectangle-xmark')}/></button>
                    </div>
            );
        }
        if(this.state.delete){
            return (
                    <div>
                        <button onClick={this.deleteAccount} ><FontAwesomeIcon  icon={solid('check')} /></button>
                        <button onClick={()=>this.setState({delete:false})}><FontAwesomeIcon icon={solid('xmark')} /></button>
                    </div>
            );
        }
        return (
            <div>
                <button onClick={()=>this.setState({edit:true})}><FontAwesomeIcon icon={solid('pen-to-square')} /></button>
                <button  onClick={()=>this.setState({delete:true})} ><FontAwesomeIcon  icon={solid('trash-can')} /></button>
            </div>
        );
    }

    render(){
        return(
            <div id = "account">
                <label>Name</label>
                <input value={this.state.name} name="name" readOnly={this.state.edit ? false: true}  onChange={this.handleChange} />
                <label>Password</label>
                <input value={this.state.password} name="password" readOnly={this.state.edit ? false: true} onChange={this.handleChange} />
                <label>{this.alterEditAndDeleteLabelText()}</label>
                <div className="icon-container" >
                    {this.generateIcons()}
                </div>
            </div>
        );
    }
}


export default Account;

import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./scss/add_account.scss";

class AddAccount extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            password: "",
            displayPostForm: false,

    
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    async submitForm(){
        const success = await this.props.addAccount(this.state.name, this.state.password);
        //handle failure
 
    }


    render(){

        const form = (
            <div className="add-account-form">
                <div className="title">Add Account</div>
                <div className="body">
                    <label>Name</label>
                    <input value={this.state.name} name="name" onChange={this.handleChange} />
                    <label>Password</label>
                    <input value={this.state.password} name="password" onChange={this.handleChange} />
                    <div className="submit-container">
                        <button onClick={this.submitForm} > <FontAwesomeIcon className="icons"  icon={solid('check')} /></button>
                        {/* <button > <FontAwesomeIcon className="icons"  icon={solid('xmark')} 
                            onClick={()=>this.setState({displayPostForm:false})} />
                        </button> */}
                    </div>
                </div>
            </div>
        );

        const buttonContainter = (
            <div className="trigger-add-account-window">
                <button onClick={()=>this.setState({displayPostForm:true})}>Add Account</button>
            </div>
        );

        return(
            <div id = "add-account">
                {this.state.displayPostForm ? form : buttonContainter }
            </div>
        );
    }
}


export default AddAccount;

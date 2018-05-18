import React from 'react';
import {connect} from 'react-redux';
import {singUp} from "../actions/loginAction"

const mapStateToProps = function(store) {
    return {
        signUpResponse: store.login.signUpResponse,
        signUpPosted: store.login.signPost,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        singUp: (inputFN, inputLN, inputUser, inputPwd) => {dispatch(singUp(inputFN, inputLN, inputUser, inputPwd))},
    };
};

class SignUp extends React.Component{

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        let fnValue = document.getElementById("firstName").value;
        let lnValue = document.getElementById("lastName").value;
        let unValue = document.getElementById("username").value;
        let psValue = document.getElementById("password").value;

        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        if (fnValue !== '' && lnValue !== '' && unValue !== '' && psValue !== '') {

            this.props.singUp(fnValue, lnValue, unValue, psValue);


        } else {
            console.log("Oops, fill out all the data!");
        }
    }

    render(){
        return(
            <div className="login-signup-container">
                <div className="login-sign-up-btns">
                    <button className="login-title inactive-form" onClick={this.props.clickProp}>Login</button>
                    <button className="sign-up-title active-form">Sign Up</button>
                </div>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name</label><input type="text" id="firstName"/>
                    <label htmlFor="lastName">First Name</label><input type="text" id="lastName"/>
                    <label htmlFor="username">Email</label><input type="text" id="username"/>
                    <label htmlFor="password">Password</label><input type="text" id="password"/>
                    <button type="submit" className="submit-btn">Log in</button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
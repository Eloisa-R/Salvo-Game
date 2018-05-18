import React from 'react';
import {connect} from 'react-redux';
import {login} from "../actions/loginAction"

const mapStateToProps = function(store) {
    return {
        loginResponse: store.login.playersResponse,
        loginPosted: store.login.post,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        login: (unValue, psValue) => {dispatch(login(unValue, psValue))},
    };
};

class Login extends React.Component{

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        let unValue = document.getElementById("username").value;
        let psValue = document.getElementById("password").value;

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        if (unValue !== '' && psValue !== '') {

            this.props.login(unValue, psValue);


        } else {
            console.log("Oops, fill out all the data!");
        }
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Email</label><input type="text" id="username"/>
                    <label htmlFor="password">Password</label><input type="text" id="password"/>
                    <button type="submit" className="btn">Log in</button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);
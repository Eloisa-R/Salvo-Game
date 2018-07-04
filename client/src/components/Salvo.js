import React, { Component } from 'react';

export default class Salvo extends Component {
    render() {
        return <span className={this.props.className + " salvo"}>{this.props.className === "red-salvo"?
            <img src={require("../cannon.png")}alt=""/>:<img src={require("../shot.png")} alt=""/>}</span>;
    }
}
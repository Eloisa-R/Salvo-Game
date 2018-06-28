import React, { Component } from 'react';

export default class Salvo extends Component {
    render() {
        return <span className={this.props.className + " salvo"}><img src={require("../shot.png")} alt=""/></span>;
    }
}
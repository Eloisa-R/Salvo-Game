import React from 'react';

class Square extends React.Component{

    getSquareType() {
        let typeClass = '';
        switch (this.props.type){
            case "hit":
                typeClass = "salvoHit";
                break;
            case "ship":
                typeClass = "with-ship";
                break;
            case "salvo":
                typeClass = "salvoFired";
                break;
            case "normal":
                typeClass = "normal"
                break;
        }
        return typeClass;
    }

    render() {
        return (

            <button className={`square ${this.getSquareType()}`} id={this.props.id}>{this.props.value}</button>
        );
    }
}

export default Square;

import React from 'react';
import ShipPiece from "./ShipPiece"
import Salvo from "./Salvo"

class Square extends React.Component{


    piece() {
         if (this.props.value !== "") {
             return this.props.value
         } else if (this.props.type === "sh" && this.props.positions.includes(this.props.coor)) {
             return <ShipPiece/>
         } else if (this.props.type === "sa" && this.props.positions.includes(this.props.coor)) {
             return <Salvo/>
         }
    }



    render() {
        return (

            <button onClick={(e) => this.props.handleSquareClick(e)} className={"square"} id={this.props.id}>{this.piece()}</button>
        );
    }
}

export default Square;

import React from 'react';
import ShipPiece from "./ShipPiece"
import Salvo from "./Salvo"
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {

    canDrop(props, monitor) {
        let shipData = monitor.getItem();
        let legalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        let coordLetter = props.letter;
        let coordNum = props.index;

        let resultDrop = [];

        function nextLetter(char, positions) {
            return String.fromCharCode(char.charCodeAt(char) + positions)
        }

        for (let i =0; i < shipData.length; i++){
            if (shipData.orientation === "horizontal") {
                resultDrop.push(coordLetter + (coordNum + i));
            } else {
                resultDrop.push(nextLetter(coordLetter,i) + coordNum);
            }
        }

        if (shipData.orientation === "horizontal" && ((props.index + shipData.length - 1) <= 10)) {
            return resultDrop
        } else if (shipData.orientation === "vertical" && (legalLetters.indexOf(props.letter) + shipData.length - 1) <= 9) {
            return resultDrop
        } else if (props.positions.some(elem=> resultDrop.includes(elem))) {
            return false
        }

    },

    drop(props, monitor) {
        let shipData = monitor.getItem();
        console.log(shipData);



        console.log(resultDrop)
        props.handleSquareDrop(resultDrop)
        // return {moved: true}


    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}


class Square extends React.Component{

    constructor(props){
        super(props);
    }
    piece() {
         if (this.props.value !== "") {
             return this.props.value
         } else if (this.props.type === "sh" && this.props.positions.includes(this.props.letter + this.props.index)) {
             return <ShipPiece/>
         } else if (this.props.type === "sa" && this.props.positions.includes(this.props.letter + this.props.index)) {
             return <Salvo/>
         }
    }

    static propTypes = {

        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired
    }

    render() {
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(

            <button className={"square"} id={this.props.id}>{this.piece()}</button>
        );
    }
}

export default DropTarget(ItemTypes.CONTAINER, squareTarget, collect) (Square);

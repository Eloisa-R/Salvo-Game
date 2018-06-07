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

        squareTarget.resultDrop = [];

        function nextLetter(char, positions) {
            return String.fromCharCode(char.charCodeAt(char) + positions)
        }

        for (let i =0; i < shipData.length; i++){
            if (shipData.orientation === "horizontal") {
                squareTarget.resultDrop.push(coordLetter + (coordNum + i));
            } else {
                squareTarget.resultDrop.push(nextLetter(coordLetter,i) + coordNum);
            }
        }


        if (props.positions.some(elem=> squareTarget.resultDrop.includes(elem))) {
            return false
        } else if (shipData.orientation === "horizontal" && ((props.index + shipData.length - 1) <= 10)) {
            return true
        } else if (shipData.orientation === "vertical" && (legalLetters.indexOf(props.letter) + shipData.length - 1) <= 9) {
            return true
        }

    },

    drop(props, monitor) {
        let shipData = monitor.getItem();

        props.handleSquareDrop(squareTarget.resultDrop, shipData.shipType)


    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
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
        isOver: PropTypes.bool.isRequired,


    }

    render() {
        const { connectDropTarget, isOver, canDrop } = this.props;
        return connectDropTarget(

            <button className={isOver? canDrop? "square green": "square red": "square"} id={this.props.id}>{this.piece()}</button>
        );
    }
}

export default DropTarget(ItemTypes.CONTAINER, squareTarget, collect) (Square);

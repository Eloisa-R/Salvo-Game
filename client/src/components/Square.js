import React from 'react';
import ShipPiece from "./ShipPiece"
import Salvo from "./Salvo"
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {


    drop(props, monitor) {
        let shipData = monitor.getItem();
        console.log(shipData);
        let coordLetter = props.letter;
        let coordNum = props.index;

        let resultDrop;
        function nextLetter(char, positions){
            return String.fromCharCode(char.charCodeAt(char) + positions)
        }

        switch(shipData.orientation){
            case "horizontal":
                switch(shipData.shipType) {
                    case "PATROL_BOAT":
                        resultDrop = [coordLetter + coordNum, coordLetter + (coordNum + 1)];
                        break;
                    case "DESTROYER":
                        resultDrop = [coordLetter + coordNum, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2)];
                        break;
                    case "SUBMARINE":
                        resultDrop = [coordLetter + coordNum, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2)];
                        break;
                    case "BATTLESHIP":
                        resultDrop = [coordLetter + coordNum, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2),coordLetter + (coordNum + 3)];
                        break;
                    case "CARRIER":
                        resultDrop = [coordLetter + coordNum, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2),coordLetter + (coordNum + 3),coordLetter + (coordNum + 4)];
                        break;
                    }
                break;
            case "vertical":
                switch(shipData.shipType) {
                    case "PATROL_BOAT":
                        resultDrop = [coordLetter + coordNum, nextLetter(coordLetter,1) + coordNum];
                        break;
                    case "DESTROYER":
                        resultDrop = [coordLetter + coordNum, nextLetter(coordLetter,1) + coordNum, nextLetter(coordLetter,2) + coordNum];
                        break;
                    case "SUBMARINE":
                        resultDrop = [coordLetter + coordNum, nextLetter(coordLetter,1) + coordNum, nextLetter(coordLetter,2) + coordNum];
                        break;
                    case "BATTLESHIP":
                        resultDrop = [coordLetter + coordNum, nextLetter(coordLetter,1) + coordNum, nextLetter(coordLetter,2) + coordNum, nextLetter(coordLetter,3) + coordNum];
                        break;
                    case "CARRIER":
                        resultDrop = [coordLetter + coordNum, nextLetter(coordLetter,1) + coordNum, nextLetter(coordLetter,2) + coordNum, nextLetter(coordLetter,3) + coordNum, nextLetter(coordLetter,4) + coordNum];
                        break;
                }
                break;

        }


        console.log(resultDrop)
        props.handleSquareDrop(resultDrop);

     }


};

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

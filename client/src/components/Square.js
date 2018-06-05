import React from 'react';
import ShipPiece from "./ShipPiece"
import Salvo from "./Salvo"
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {


    drop(props, monitor) {
        let shipData = monitor.getItem();
        console.log(shipData.shipType);
        let coordLetter = props.coor.split("")[0];
        let coordNum = parseInt(props.coor.split("")[1]);

        let resultDrop;
        switch(shipData.shipType) {
            case "PATROL_BOAT":
                resultDrop = [props.coor, coordLetter + (coordNum + 1)];
                break;
            case "DESTROYER":
                resultDrop = [props.coor, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2)];
                break;
            case "SUBMARINE":
                resultDrop = [props.coor, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2)];
                break;
            case "BATTLESHIP":
                resultDrop = [props.coor, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2),coordLetter + (coordNum + 3)];
                break;
            case "CARRIER":
                resultDrop = [props.coor, coordLetter + (coordNum + 1), coordLetter + (coordNum + 2),coordLetter + (coordNum + 3),coordLetter + (coordNum + 4)];
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
         } else if (this.props.type === "sh" && this.props.positions.includes(this.props.coor)) {
             return <ShipPiece/>
         } else if (this.props.type === "sa" && this.props.positions.includes(this.props.coor)) {
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

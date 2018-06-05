import React from 'react';
import ShipPiece from "./ShipPiece"
import Salvo from "./Salvo"
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {

    canDrop(props, monitor) {
        // You can disallow drop based on props or item
        console.log(monitor.getItem());

    },


    drop(props, monitor, component) {
        props.handleSquareDrop(props.coor);
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

export default DropTarget([ItemTypes.SHIPPIECE, ItemTypes.CONTAINER], squareTarget, collect) (Square);

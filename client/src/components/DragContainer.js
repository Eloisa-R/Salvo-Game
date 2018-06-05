import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import ShipPiece from "./ShipPiece"

const pieceSource = {
    beginDrag(props) {
        return {"shipType": props.shipType}

    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


class DragContainer extends Component {
    constructor(){
        super();
        this.renderShip = this.renderShip.bind(this);
    }

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    renderShip(){
        let itemNumber;
        let result = [];
        switch(this.props.shipType){
            case "PATROL_BOAT":
                itemNumber = 2;
                break;
            case "DESTROYER":
                itemNumber = 3;
                break;
            case "SUBMARINE":
                itemNumber = 3;
                break;
            case "BATTLESHIP":
                itemNumber = 4;
                break;
            case "CARRIER":
                itemNumber = 5;
                break;
        }
        for (let i = 0; i < itemNumber; i++) {
            result.push(<ShipPiece key={i}/>)
        }
        return [result]
    }

    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(<span className="ship-container" >{this.renderShip()}</span>);
    }

}

export default DragSource(ItemTypes.CONTAINER, pieceSource, collect) (DragContainer);

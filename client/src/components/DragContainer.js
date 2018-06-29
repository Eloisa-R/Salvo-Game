import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import ShipPiece from "./ShipPiece"

const pieceSource = {
    beginDrag(props) {
        return {"shipType": props.shipType, "orientation": props.orientation, "length": props.length}

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
        let result = [];

        for (let i = 0; i < this.props.length; i++) {
            result.push(<ShipPiece key={i}/>)
        }
        return [result]
    }

    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(<span className={"ship-container " + this.props.orientation}  id={this.props.id}>{this.renderShip()}</span>);
    }

}

export default DragSource(ItemTypes.CONTAINER, pieceSource, collect) (DragContainer);

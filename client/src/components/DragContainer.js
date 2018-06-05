import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import ShipPiece from "./ShipPiece"

const pieceSource = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


class DragContainer extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(<span className="ship-container" ><ShipPiece shipType={this.props.shipType}/><ShipPiece shipType={this.props.shipType}/></span>);
    }

}

export default DragSource(ItemTypes.CONTAINER, pieceSource, collect) (DragContainer);

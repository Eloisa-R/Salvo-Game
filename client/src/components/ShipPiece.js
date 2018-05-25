import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

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


class ShipPiece extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(<span className="ship-icon" style={{opacity: isDragging ? 0.5 : 1, cursor: 'move', color: isDragging ? 'blue' : 'black',}}>⛵</span>);
    }

}

export default DragSource(ItemTypes.SHIPPIECE, pieceSource, collect) (ShipPiece);

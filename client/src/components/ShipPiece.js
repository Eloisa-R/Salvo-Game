import React, { Component } from 'react';

class ShipPiece extends Component {

    render() {
        return <span className="ship-icon" role="img" aria-label="ship"><img src={require('../boat_px_art.jpg')} alt=""/></span>
    }

}

export default ShipPiece;

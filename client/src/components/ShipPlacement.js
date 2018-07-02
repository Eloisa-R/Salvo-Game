import React from 'react';
import Grid from "./Grid";
import DragContainer from "./DragContainer";


class ShipPlacement extends React.Component{

    render() {
        return (

             <div>
                 <div className="grid-and-ships">
                    <Grid data={this.props.gamePlayerResponse} title={this.props.title} sunkenPositions={this.props.mySunkenArray}
                          takenPositions={this.props.takenPositions}
                          gridType={this.props.gridType} handleSquareDrop={this.props.handleSquareDrop}
                          prov_array={this.props.prov_array} playerId={this.props.playerId} oponentId={this.props.oponentId}
                          toBeRemoved={this.props.toBeRemoved}/>
                    <div className="boats-and-submit">
                        <div className="all-boats-cont">
                            <h4>Drag and drop your ship!</h4>
                            <div className="orientation-btns">
                                <button onClick={() => this.props.handleOrientation("horizontal")}
                                        className={this.props.hActive ? 'orient-active' : 'orient-inactive'}>Horizontal
                                </button>
                                <button onClick={() => this.props.handleOrientation("vertical")}
                                        className={this.props.vActive ? 'orient-active' : 'orient-inactive'}>Vertical
                                </button>
                            </div>
                            <div className="shipsToChoose">
                                <div className="ship-wrapper">
                                <div className="shipTitle">Patrol boat</div>
                                {"PATROL_BOAT" in this.props.shipTypesPositioned ?
                                    <button onClick={() => this.props.removeShip("PATROL_BOAT")}
                                            onMouseEnter={() => this.props.highlightShip("PATROL_BOAT")}
                                            onMouseLeave={() => this.props.unHighlightShip("PATROL_BOAT")}
                                            className="undo-pos">Undo</button> :
                                    <DragContainer id={"patrol-boat"} shipType={"PATROL_BOAT"} length={2}
                                                   orientation={this.props.orientation}/>}
                                </div>
                                <div className="ship-wrapper">
                                <div className="shipTitle">Destroyer</div>
                                {"DESTROYER" in this.props.shipTypesPositioned ?
                                    <button onClick={() => this.props.removeShip("DESTROYER")}
                                            onMouseEnter={() => this.props.highlightShip("DESTROYER")}
                                            onMouseLeave={() => this.props.unHighlightShip("DESTROYER")}
                                            className="undo-pos">Undo</button> :
                                    <DragContainer id={"destroyer"} shipType={"DESTROYER"} length={3}
                                                   orientation={this.props.orientation}/>}
                                </div>
                                <div className="ship-wrapper">
                                <div className="shipTitle">Submarine</div>
                                {"SUBMARINE" in this.props.shipTypesPositioned ?
                                    <button onClick={() => this.props.removeShip("SUBMARINE")}
                                            onMouseEnter={() => this.props.highlightShip("SUBMARINE")}
                                            onMouseLeave={() => this.props.unHighlightShip("SUBMARINE")}
                                            className="undo-pos">Undo</button> :
                                    <DragContainer id={"submarine"} shipType={"SUBMARINE"} length={3}
                                                   orientation={this.props.orientation}/>}
                                </div>
                                <div className="ship-wrapper">
                                 <div className="shipTitle">Battleship</div>
                                {"BATTLESHIP" in this.props.shipTypesPositioned ?
                                    <button onClick={() => this.props.removeShip("BATTLESHIP")}
                                            onMouseEnter={() => this.props.highlightShip("BATTLESHIP")}
                                            onMouseLeave={() => this.props.unHighlightShip("BATTLESHIP")}
                                            className="undo-pos">Undo</button> :
                                    <DragContainer id={"battleship"} shipType={"BATTLESHIP"} length={4}
                                                   orientation={this.props.orientation}/>}
                                </div>
                                <div className="ship-wrapper">
                                <div className="shipTitle">Carrier</div>
                                {"AIRCRAFT_CARRIER" in this.props.shipTypesPositioned ?
                                    <button onClick={() => this.props.removeShip("AIRCRAFT_CARRIER")}
                                            onMouseEnter={() => this.props.highlightShip("AIRCRAFT_CARRIER")}
                                            onMouseLeave={() => this.props.unHighlightShip("AIRCRAFT_CARRIER")}
                                            className="undo-pos">Undo</button> :
                                    <DragContainer id={"a-carrier"} shipType={"AIRCRAFT_CARRIER"} length={5}
                                                   orientation={this.props.orientation}/>}
                                </div>
                            </div>
                        </div>
                         <div className="bottom-div-boats">

                             <div className="submit-ships"><h4>When you're ready, submit your ships!</h4> <button onClick={this.props.handleSubmitShips}>Submit</button></div>
                         </div>
                    </div>
                </div>


                </div>

        );
    }
}

export default ShipPlacement;

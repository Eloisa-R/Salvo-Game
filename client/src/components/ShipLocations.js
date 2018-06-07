import React from 'react';
import {connect} from 'react-redux';
import {fetchShips} from "../actions/shipsAction";
import {placeShips} from "../actions/shipsAction";
import {updateGrid} from "../actions/shipsAction";
import {logOut} from "../actions/loginAction";
import Grid from "./Grid"
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from 'react-dnd';
import ShipPiece from "./ShipPiece";
import DragContainer from "./DragContainer";



const mapStateToProps = function(store) {
    return {
        shipsFetched: store.ships.fetched,
        gamePlayerResponse: store.ships.gamePlayerResponse,
        getShipsFailed: store.ships.failed,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGamePlayer: (id) => {dispatch(fetchShips(id))},
        logOut: () => {dispatch(logOut())},
        placeShips: (gpID, shipList) => {dispatch(placeShips(gpID, shipList))},
        updateGrid: (provArray) => {dispatch(updateGrid(provArray))},
    };
};


class ShipLocations extends React.Component{
    constructor(){
        super();
    this.state = {
        shipsPositions: [],
        salvoPositions: ["A1", "A2", "A3", "F7", "E7"],
        orientation: "horizontal",
        hActive: true,
        vActive: false
    }
    this.handleSquareDrop = this.handleSquareDrop.bind(this);
    this.getOponentId = this.getOponentId.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
    }


    getOponentId(){
        //the params.id and the id in the JSON response are different types, so the comparison needs to be like this (!=)
        //otherwise, !== would return any of the ids in the JSON
        let oponentObject = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        if (oponentObject.length === 0) {
            return "no oponent yet"
        }else {
            return oponentObject[0].id;
        }

    }

    getPlayeremail(){
       let playerObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id == this.props.match.params.id);
       return playerObj[0].player.email;
    }

    getOponentemail(){
        let oponentObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);

    return oponentObj.length === 0? "no one yet!" : oponentObj[0].player.email;
    }

    handleSubmitShips(){
        this.props.placeShips(this.props.match.params.id, [ { "type": "DESTROYER", "locations": ["A1", "B1", "C1"]},
            { "type": "PATROL_BOAT", "locations": ["H5", "H6"]}
        ])
    }

    handleLogOut(){
        this.props.logOut();
        this.props.history.push(`/games`);

    }

    handleSquareDrop(coorArray){
       let positions = this.state.shipsPositions.slice();
       positions = positions.concat(coorArray);
       this.setState({shipsPositions: positions});
    }

    handleOrientation(inputOr){

        inputOr === "horizontal"? this.setState({orientation: inputOr, hActive: true, vActive: false}) : this.setState({orientation: inputOr, hActive: false, vActive: true});

    }

    componentWillMount(){
        this.props.fetchGamePlayer(this.props.match.params.id);
    }



    render(){
        if (!this.props.shipsFetched) {
            return <p>Loading...</p>;
        } else if (this.props.getShipsFailed) {
            return <p> You're not authorised to see this information.</p>;
        } else if ((this.props.shipsFetched) && !(this.props.getShipsFailed)) {return (
            <div className="main-ships-container">
                <div className="ships-data">
                    <div>
                        <h3>Ship Locations!</h3>
                        <div>Hello, player {this.getPlayeremail()}</div>
                        <div>Your oponent is {this.getOponentemail()}</div>
                        {this.props.gamePlayerResponse.ships.map((ship, index) =>
                            <div key={index}>{ship.type}, {ship.locations}</div>
                        )}
                    </div>
                    <div className="logout-btn"><button onClick={this.handleLogOut}>Log Out</button></div>
                </div>

                <div className="gridContainer">
                    <Grid data={this.props.gamePlayerResponse} title={"My Ships"} takenPositions={this.state.shipsPositions} gridType={"sh"} handleSquareDrop={this.handleSquareDrop} prov_array={this.prov_array} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>

                    <Grid data={this.props.gamePlayerResponse} title={"Salvoes I Fired"} takenPositions={this.state.salvoPositions} gridType={"sa"} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>

                </div>
                 <div className="all-boats-cont">
                    <div className="orientation-btns">
                        <button onClick={() => this.handleOrientation("horizontal")} className={this.state.hActive ? 'orient-active': 'orient-inactive'}>Horizontal</button>
                        <button onClick={() => this.handleOrientation("vertical")} className={this.state.vActive ? 'orient-active': 'orient-inactive'}>Vertical</button>
                    </div>
                    <div className="shipsToChoose">
                        <div className="shipTitle">Patrol boat</div>
                        <DragContainer shipType={"PATROL_BOAT"} length={2} orientation={this.state.orientation}/>
                        <div className="shipTitle">Destroyer</div>
                        <DragContainer shipType={"DESTROYER"} length={3} orientation={this.state.orientation}/>
                        <div className="shipTitle">Submarine</div>
                        <DragContainer shipType={"SUBMARINE"} length={3} orientation={this.state.orientation}/>
                        <div className="shipTitle">Battleship</div>
                        <DragContainer shipType={"BATTLESHIP"} length={4} orientation={this.state.orientation}/>
                        <div className="shipTitle">Carrier</div>
                        <DragContainer shipType={"CARRIER"} length={5} orientation={this.state.orientation}/>
                    </div>
                 </div>
            </div>
        );}

    }
}

ShipLocations = DragDropContext(HTML5Backend) (ShipLocations);
export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);
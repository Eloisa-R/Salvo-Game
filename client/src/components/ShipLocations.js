import React from 'react';
import {connect} from 'react-redux';
import {fetchShips} from "../actions/shipsAction";
import {placeShips} from "../actions/shipsAction";
import {updateGrid} from "../actions/shipsAction";
import {fireSalvoes} from "../actions/shipsAction";
import {logOut} from "../actions/loginAction";
import Grid from "./Grid"
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from 'react-dnd';
import DragContainer from "./DragContainer";



const mapStateToProps = function(store) {
    return {
        shipsFetched: store.ships.fetched,
        gamePlayerResponse: store.ships.gamePlayerResponse,
        getShipsFailed: store.ships.failed,
        allShipsArray: store.ships.allShipsArray,
        mySalvoesArray: store.ships.mySalvoesArray,
        mySunkenArray: store.ships.mySunkenArray,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGamePlayer: (id) => {dispatch(fetchShips(id))},
        logOut: () => {dispatch(logOut())},
        placeShips: (gpID, shipList) => {dispatch(placeShips(gpID, shipList))},
        fireSalvoes: (gpID, salvoesList) => {dispatch(fireSalvoes(gpID, salvoesList))},
        updateGrid: (provArray) => {dispatch(updateGrid(provArray))},
    };
};


class ShipLocations extends React.Component{
    constructor(props){
        super(props);
    this.state = {

        shipsPositions: [],
        shipTypesPositioned: {},
        salvoPositions: new Set(),
        orientation: "horizontal",
        hActive: true,
        vActive: false,
        turn: 0
    }

    this.handleSquareDrop = this.handleSquareDrop.bind(this);
    this.getOponentId = this.getOponentId.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
    this.removeShip = this.removeShip.bind(this);
    this.handleSubmitShips = this.handleSubmitShips.bind(this);
    this.handleClickSalvo = this.handleClickSalvo.bind(this);
    this.handleUndoSalvo = this.handleUndoSalvo.bind(this);
    this.handleSubmitSalvo = this.handleSubmitSalvo.bind(this);
    this.showHits = this.showHits.bind(this);
    this.showSunkenShips = this.showSunkenShips.bind(this);
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
        let JSONsubmit = [];
        if (Object.keys(this.state.shipTypesPositioned).length >0) {
            for (let key in this.state.shipTypesPositioned) {
                JSONsubmit.push({"type": key, "locations": this.state.shipTypesPositioned[key]})
            }

            this.props.placeShips(this.props.match.params.id, JSONsubmit)

        } else {
            console.log("No ships placed!")
        }
    }

    handleLogOut(){
        this.props.logOut();
        this.props.history.push(`/games`);

    }

    handleSquareDrop(coorArray, shipType){
       let positions = this.state.shipsPositions.slice();
       positions = positions.concat(coorArray);
       let shipTypePos = Object.assign({[shipType]: coorArray},this.state.shipTypesPositioned);
       this.setState({shipsPositions: positions, shipTypesPositioned: shipTypePos});
    }

    removeShip(shipType){
        let positions = this.state.shipsPositions.slice();
        let shipTypePos = Object.assign({},this.state.shipTypesPositioned);
        shipTypePos[shipType].forEach(ele => positions.splice(positions.indexOf(ele),1));
        delete shipTypePos[shipType];
        this.setState({shipsPositions: positions, shipTypesPositioned: shipTypePos});
    }

    handleOrientation(inputOr){

        inputOr === "horizontal"? this.setState({orientation: inputOr, hActive: true, vActive: false}) : this.setState({orientation: inputOr, hActive: false, vActive: true});

    }

    handleClickSalvo(location){
        console.log(this.state.salvoPositions)
        const salvoLocations = new Set(this.state.salvoPositions)
        if (salvoLocations.size < 5) {
            salvoLocations.add(location)
            this.setState({salvoPositions:salvoLocations})
        }

    }

    handleUndoSalvo(location){
        const salvoLocations = new Set(this.state.salvoPositions);
        salvoLocations.delete(location)
        this.setState({salvoPositions:salvoLocations})
    }

    handleSubmitSalvo(){
        let JSONsubmit = {};
        let turn = this.state.turn;
        let locations = Array.from(this.state.salvoPositions);
        if (locations.length > 0) {
            JSONsubmit[turn + 1] = locations
            this.props.fireSalvoes(this.props.match.params.id, JSONsubmit)
            this.setState({turn: turn + 1})
        } else {
            console.log("No salvoes were fired!")
        }
    }

    showHits() {
        let resultDict = {};
        let hits = this.props.gamePlayerResponse.successful_hits;
        for (let key in hits) {
            for (let shipKey in hits[key]) {
                resultDict[shipKey] = resultDict[shipKey]? resultDict[shipKey] + hits[key][shipKey] : hits[key][shipKey]
            }
        }

        let results = Object.keys(resultDict).map(element => <li key={element}>{element}: {resultDict[element]}</li>)
        return <ul>{results}</ul>
    }

    showSunkenShips(){
        let sunken = this.props.gamePlayerResponse.oponent_sunken_ships;
        let sunkBoats = Object.keys(sunken);
        let sunkList = sunkBoats.map(element => <li key={element}> {element}</li>)

        return <ul>{sunkList}</ul>
    }


    componentDidMount(){
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
                        <div>Hello, player {this.getPlayeremail()}</div>
                        <div>Your oponent is {this.getOponentemail()}</div>
                        {/*{this.props.gamePlayerResponse.ships.map((ship, index) =>*/}
                            {/*<div key={index}>{ship.type}, {ship.locations}</div>*/}
                        {/*)}*/}
                        <div className="logout-btn"><button onClick={this.handleLogOut}>Log Out</button></div>
                    </div>

                    <div>Oponent got hits on the following ships: {this.showHits()}</div>
                    <div>Oponent sunk ships: {this.showSunkenShips()}</div>
                </div>

                <div className="gridContainer">
                    <Grid data={this.props.gamePlayerResponse} title={"My Ships"} sunkenPositions={this.props.mySunkenArray}
                          takenPositions={this.props.allShipsArray.length > 0? this.props.allShipsArray: this.state.shipsPositions}
                          gridType={"sh"} handleSquareDrop={this.handleSquareDrop} prov_array={this.prov_array} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>

                    {this.props.allShipsArray.length > 0 ?<Grid data={this.props.gamePlayerResponse} title={"Salvoes I Fired"} clickSalvo={this.handleClickSalvo} takenPositions={this.props.mySalvoesArray.length > 0? this.props.mySalvoesArray: Array.from(this.state.salvoPositions)} gridType={"sa"} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>: <div></div>}

                </div>
                {this.props.allShipsArray.length > 0 ?
                    this.props.mySalvoesArray.length > 0 ?
                        <div></div>: <div className="fire-salvoes-mss"><h4>Now Fire some Salvoes!</h4>
                            <div>Click on the squares to fire up to 5 times, then click Submit when you're ready!</div>
                            <div>{Array.from(this.state.salvoPositions).map(el => <button key={el} onClick={() => this.handleUndoSalvo(el)} className="undo-salvo">Undo {el}</button>)}</div>
                            <button onClick={this.handleSubmitSalvo}>Submit</button>
                        </div>
                    :<div className="bottom-div-boats">
                    <div className="all-boats-cont">
                        <h4>Drag and drop your ship!</h4>
                        <div className="orientation-btns">
                            <button onClick={() => this.handleOrientation("horizontal")}
                                    className={this.state.hActive ? 'orient-active' : 'orient-inactive'}>Horizontal
                            </button>
                            <button onClick={() => this.handleOrientation("vertical")}
                                    className={this.state.vActive ? 'orient-active' : 'orient-inactive'}>Vertical
                            </button>
                        </div>
                        <div className="shipsToChoose">
                            <div className="shipTitle">Patrol boat</div>
                            {"PATROL_BOAT" in this.state.shipTypesPositioned ?
                                <button onClick={() => this.removeShip("PATROL_BOAT")}
                                        className="undo-pos">Undo</button> :
                                <DragContainer shipType={"PATROL_BOAT"} length={2}
                                               orientation={this.state.orientation}/>}
                            <div className="shipTitle">Destroyer</div>
                            {"DESTROYER" in this.state.shipTypesPositioned ?
                                <button onClick={() => this.removeShip("DESTROYER")}
                                        className="undo-pos">Undo</button> :
                                <DragContainer shipType={"DESTROYER"} length={3} orientation={this.state.orientation}/>}
                            <div className="shipTitle">Submarine</div>
                            {"SUBMARINE" in this.state.shipTypesPositioned ?
                                <button onClick={() => this.removeShip("SUBMARINE")}
                                        className="undo-pos">Undo</button> :
                                <DragContainer shipType={"SUBMARINE"} length={3} orientation={this.state.orientation}/>}
                            <div className="shipTitle">Battleship</div>
                            {"BATTLESHIP" in this.state.shipTypesPositioned ?
                                <button onClick={() => this.removeShip("BATTLESHIP")}
                                        className="undo-pos">Undo</button> :
                                <DragContainer shipType={"BATTLESHIP"} length={4}
                                               orientation={this.state.orientation}/>}
                            <div className="shipTitle">Carrier</div>
                            {"AIRCRAFT_CARRIER" in this.state.shipTypesPositioned ?
                                <button onClick={() => this.removeShip("AIRCRAFT_CARRIER")} className="undo-pos">Undo</button> :
                                <DragContainer shipType={"AIRCRAFT_CARRIER"} length={5} orientation={this.state.orientation}/>}
                        </div>
                    </div>
                    <div className="submit-ships"><h4>When you're ready, submit your ships!</h4> <button onClick={this.handleSubmitShips}>Submit</button></div>
                    </div>
                }
            </div>
        );}

    }
}

ShipLocations = DragDropContext(HTML5Backend) (ShipLocations);
export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);
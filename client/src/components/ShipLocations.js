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
import ShipPlacement from "./ShipPlacement"
import FireSalvoes from "./FireSalvoes"
import Results from "./Results"



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
                    {this.props.gamePlayerResponse.status == 10 || this.props.gamePlayerResponse.status ==20 || this.props.gamePlayerResponse.status == 50?
                        <div>
                        <ShipPlacement gamePlayerResponse={this.props.gamePlayerResponse} title={"My Ships"} mySunkenArray={this.props.mySunkenArray}
                                        takenPositions={this.state.shipsPositions}
                                        gridType={"sh"} handleSquareDrop={this.handleSquareDrop} prov_array={this.prov_array} playerId={this.props.match.params.id}
                                        oponentId={this.getOponentId()} handleOrientation={this.handleOrientation} hActive={this.state.hActive} vActive={this.state.vActive}
                                        shipTypesPositioned={this.state.shipTypesPositioned} removeShip={this.removeShip} orientation={this.state.orientation}
                                        handleSubmitShips={this.handleSubmitShips}/>
                        </div>
                        : this.props.gamePlayerResponse.status == 30 || this.props.gamePlayerResponse.status == 40 || this.props.gamePlayerResponse.status == 70? <div>Wait for the oponent</div> : this.props.gamePlayerResponse.status == 60?
                            <FireSalvoes salvoPositions={this.state.salvoPositions} gamePlayerResponse={this.props.gamePlayerResponse} handleUndoSalvo={this.handleUndoSalvo}
                                         handleSubmitSalvo={this.handleSubmitSalvo} handleClickSalvo={this.handleClickSalvo}
                                         takenPositions={this.props.mySalvoesArray.length > 0? this.props.mySalvoesArray: Array.from(this.state.salvoPositions)} gridType={"sa"}
                            /> : this.props.gamePlayerResponse.status == 80?
                                <div>
                                    <Results data={this.props.gamePlayerResponse} sunkenPositions={this.props.mySunkenArray}
                                             allShipsArray={this.props.allShipsArray} mySalvoesArray={this.props.mySalvoesArray}/>
                                </div>
                                : <div></div>

                    }

                </div>
            </div>
        );}

    }
}

ShipLocations = DragDropContext(HTML5Backend) (ShipLocations);
export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);
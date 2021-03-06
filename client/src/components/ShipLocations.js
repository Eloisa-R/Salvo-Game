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
import {Link} from "react-router-dom";



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
        clickedFireSalvoes: false,
        shipstoBeRemoved: []
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
    this.onClikFireSalvoes = this.onClikFireSalvoes.bind(this);
    this.highlightShip = this.highlightShip.bind(this);
    this.unHighlightShip = this.unHighlightShip.bind(this);
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
        let toBeRemoved = this.state.shipstoBeRemoved.slice();
        let positions = this.state.shipsPositions.slice();
        let shipTypePos = Object.assign({},this.state.shipTypesPositioned);
        shipTypePos[shipType].forEach(ele => {positions.splice(positions.indexOf(ele),1);
            toBeRemoved.splice(toBeRemoved.indexOf(ele),1)});
        delete shipTypePos[shipType];
        this.setState({shipsPositions: positions, shipTypesPositioned: shipTypePos, shipstoBeRemoved:toBeRemoved});
    }

    highlightShip(shipType){
        let toBeRemoved = this.state.shipstoBeRemoved.slice();
        let shipTypePos = Object.assign({},this.state.shipTypesPositioned);
        shipTypePos[shipType].forEach(ele => toBeRemoved.push(ele));
        this.setState({shipstoBeRemoved:toBeRemoved});
    }

    unHighlightShip(shipType){
        let toBeRemoved = this.state.shipstoBeRemoved.slice();
        let shipTypePos = Object.assign({},this.state.shipTypesPositioned);
        shipTypePos[shipType].forEach(ele => toBeRemoved.splice(toBeRemoved.indexOf(ele),1));
        this.setState({shipstoBeRemoved:toBeRemoved});
    }

    handleOrientation(inputOr){

        inputOr === "horizontal"? this.setState({orientation: inputOr, hActive: true, vActive: false}) : this.setState({orientation: inputOr, hActive: false, vActive: true});

    }

    handleClickSalvo(location){
        if (!this.props.mySalvoesArray.includes(location)) {
            const salvoLocations = new Set(this.state.salvoPositions)
            if (salvoLocations.size < 5) {
                salvoLocations.add(location)
                this.setState({salvoPositions:salvoLocations})
            }
        }


    }

    handleUndoSalvo(location){
        const salvoLocations = new Set(this.state.salvoPositions);
        salvoLocations.delete(location)
        this.setState({salvoPositions:salvoLocations})
    }

    handleSubmitSalvo(){
        let JSONsubmit = {};
        let salvoesDict = this.props.gamePlayerResponse.salvoes[this.props.match.params.id];
        let salvoesKeys = Object.keys(salvoesDict);
        let turn;
        if (salvoesKeys.length === 0) {
            turn = 1
        } else {
            salvoesKeys.sort(function(a, b){return b-a});
            turn = parseInt(salvoesKeys[0]) + 1;
        }

        let locations = Array.from(this.state.salvoPositions);
        if (locations.length > 0) {
            JSONsubmit[turn] = locations
            this.props.fireSalvoes(this.props.match.params.id, JSONsubmit)
            this.setState({clickedFireSalvoes: false, salvoPositions:new Set()})
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
        return <ul>{results.length >0? results: "None yet"}</ul>
    }

    showSunkenShips(){
        let sunken = this.props.gamePlayerResponse.oponent_sunken_ships;
        let sunkBoats = Object.keys(sunken);
        let sunkList = sunkBoats.map(element => <li key={element}> {element}</li>)

        return <ul>{sunkList.length > 0? sunkList: "None yet"}</ul>
    }

    onClikFireSalvoes(){
        this.setState({clickedFireSalvoes: true})
    }



    componentDidMount(){
        this.props.fetchGamePlayer(this.props.match.params.id);
        setInterval(() => {this.props.fetchGamePlayer(this.props.match.params.id)}, 3000);
    }



    render(){
        if (!this.props.shipsFetched) {
            return <p className="main-ships-container">Loading...</p>;
        } else if (this.props.getShipsFailed) {
            return <p className="main-ships-container"> You're not authorised to see this information.</p>;
        } else if ((this.props.shipsFetched) && !(this.props.getShipsFailed)) {return (
            <div className="main-ships-container">
                <div className="ships-data">
                    <div><Link to={"/games"}> {'<<'} Back to Main</Link></div>
                    <div>
                        <div>Hello, player {this.getPlayeremail()}</div>
                        <div>Your opponent is {this.getOponentemail()}</div>
                        <div className="logout-btn"><button onClick={this.handleLogOut}>Log Out</button></div>
                    </div>


                </div>

                <div className="gridContainer">
                    {this.props.gamePlayerResponse.status == 10 || this.props.gamePlayerResponse.status ==20 || this.props.gamePlayerResponse.status == 50?
                        <div>
                        <ShipPlacement highlightShip={this.highlightShip} unHighlightShip={this.unHighlightShip} toBeRemoved={this.state.shipstoBeRemoved}gamePlayerResponse={this.props.gamePlayerResponse} title={"My Ships"} mySunkenArray={this.props.mySunkenArray}
                                        takenPositions={this.state.shipsPositions}
                                        gridType={"sh"} handleSquareDrop={this.handleSquareDrop} prov_array={this.prov_array} playerId={this.props.match.params.id}
                                        oponentId={this.getOponentId()} handleOrientation={this.handleOrientation} hActive={this.state.hActive} vActive={this.state.vActive}
                                        shipTypesPositioned={this.state.shipTypesPositioned} removeShip={this.removeShip} orientation={this.state.orientation}
                                        handleSubmitShips={this.handleSubmitShips}/>
                        </div>
                        : this.props.gamePlayerResponse.status == 30 || this.props.gamePlayerResponse.status == 40 || this.props.gamePlayerResponse.status == 70? <div className="wait-opponent">Wait for the opponent</div>
                            : this.props.gamePlayerResponse.status == 60 || this.state.clickedFireSalvoes?
                            <FireSalvoes salvoPositions={this.state.salvoPositions} gamePlayerResponse={this.props.gamePlayerResponse} handleUndoSalvo={this.handleUndoSalvo}
                                         handleSubmitSalvo={this.handleSubmitSalvo} handleClickSalvo={this.handleClickSalvo}
                                         takenPositions={this.props.mySalvoesArray} newTakenPositions={Array.from(this.state.salvoPositions).length == 0? []:Array.from(this.state.salvoPositions)}
                                         gridType={"sa"}/>
                                : this.props.gamePlayerResponse.status == 80?
                                <div>
                                    <Results data={this.props.gamePlayerResponse} sunkenPositions={this.props.mySunkenArray}
                                             allShipsArray={this.props.allShipsArray} mySalvoesArray={this.props.mySalvoesArray}
                                             onClikFireSalvoes={this.onClikFireSalvoes} showHits={this.showHits()}
                                             showSunkenShips={this.showSunkenShips()} newTakenPositions={[]}/>
                                </div>
                                : this.props.gamePlayerResponse.status == 90? <div><h3>Game over!!</h3></div> : <div></div>

                    }

                </div>
            </div>
        );}

    }
}

ShipLocations = DragDropContext(HTML5Backend) (ShipLocations);
export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);
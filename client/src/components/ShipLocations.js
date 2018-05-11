import React from 'react';
import {connect} from 'react-redux';
import {fetchShips} from "../actions/shipsAction";

const mapStateToProps = function(store) {
    return {
        shipsFetched: store.ships.fetched,
        gamePlayerResponse: store.ships.gamePlayerResponse,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGamePlayer: (id) => {dispatch(fetchShips(id))},
    };
};
class ShipLocations extends React.Component{
    constructor(){
        super();
    this.loadShipsOnGrid = this.loadShipsOnGrid.bind(this);
    this.loadSalvoesOnGrid = this.loadSalvoesOnGrid.bind(this);
    this.loadHitsOnGrid = this.loadHitsOnGrid.bind(this);
    this.getOponentId = this.getOponentId.bind(this);
    }


    getOponentId(){
        //the params.id and the id in the JSON response are different types, so the comparison needs to be like this (!=)
        //otherwise, !== would return any of the ids in the JSON
        let oponentObject = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        return oponentObject[0].id;
    }

    getPlayeremail(){
       let playerObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id == this.props.match.params.id);
       return playerObj[0].player.email;
    }

    getOponentemail(){
        let oponentObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        return oponentObj[0].player.email;
    }

    loadShipsOnGrid(){
        this.props.gamePlayerResponse.ships.forEach((element) => {
            element.locations.forEach((location) => {document.getElementById("sh-" + location).classList.add("with-ship")})
        })
    }

    loadSalvoesOnGrid(){
        let salvoesDict = this.props.gamePlayerResponse.salvoes[this.props.match.params.id];

        for (let key in salvoesDict) {
            salvoesDict[key].forEach((element) => {
                document.getElementById("sa-" + element).innerHTML = key;
                document.getElementById("sa-" + element).classList.add("salvoFired");
            })
        }
    }

    loadHitsOnGrid(){
        let hitsDict = this.props.gamePlayerResponse.salvoes[this.getOponentId()];
        for (let key in hitsDict) {
            hitsDict[key].forEach((element) => {
                let hitOnGrid = document.getElementById("sh-" + element);
                if (hitOnGrid.classList.contains("with-ship")) {
                    hitOnGrid.classList.remove("with-ship");
                    hitOnGrid.innerHTML = key;
                    hitOnGrid.classList.add("salvoHit");
                }
            })
        }
    }

    loadGrid(ships_or_salvoes){

        let letterArray = ["Z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        let buttons;
        function generateRow(letter, index_key){
            buttons = letterArray.map((element, index) =>
            { if (letter === "Z" && index !==0) {
                    return <button key={index} className="square" id={ships_or_salvoes + "-"+ letter + index}>{index}</button>
                } else if (letter !== "Z" && index === 0) {
                    return <button key={index} className="square" id={ships_or_salvoes + "-"+ letter + index}>{letter}</button>
                } else {
                    return <button key={index} className="square" id={ships_or_salvoes + "-"+ letter + index}/>
                }})

            return <div className="row" key={index_key}>{buttons}</div>
        }
        return letterArray.map((element, index) => generateRow(element, index))
    }

    componentWillMount(){
        this.props.fetchGamePlayer(this.props.match.params.id);
    }

    componentDidUpdate(){
        if (this.props.gamePlayerResponse !== null) {
            this.loadShipsOnGrid();
            this.loadHitsOnGrid();
            this.loadSalvoesOnGrid();

        }

    }


    render(){
        if (!this.props.shipsFetched) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <h3>Ship Locations!</h3>
                <div>Hello, player {this.getPlayeremail()}</div>
                <div>Your oponent is {this.getOponentemail()}</div>
                {this.props.gamePlayerResponse.ships.map((ship, index) =>
                    <div key={index}>{ship.type}, {ship.locations}</div>
                )}
                <div className="gridContainer">
                    <div className="grid"><h4>My Ships</h4>{this.loadGrid("sh")}</div>
                <div className="grid"><h4>Salvoes I Fired</h4>{this.loadGrid("sa")}</div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);
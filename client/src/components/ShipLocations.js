import React from 'react';
import {connect} from 'react-redux';

// @connect()
class ShipLocations extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            gamePlayerResponse: "",
            player: "",
            playerGPId: "",
            oponent: "",
            oponentGPId: ""
        }
    this.loadLocations = this.loadLocations.bind(this);
    this.loadShipsOnGrid = this.loadShipsOnGrid.bind(this);
    this.loadSalvoesOnGrid = this.loadSalvoesOnGrid.bind(this);
    this.loadHitsOnGrid = this.loadHitsOnGrid.bind(this);
    }

    loadLocations(){
        fetch('http://localhost:8080/api/game_view/' + this.props.match.params.id, {headers: {'Access-Control-Allow-Origin':'*'}})
            .then(response => response.json())
            .then((data) => {
                this.setState({gamePlayerResponse: data, isLoading: false})
                this.loadShipsOnGrid();
                this.state.gamePlayerResponse.gamePlayers.forEach((element) => {
                    if (element.id == this.props.match.params.id) {
                        this.setState({player:element.player.email, playerGPId: element.id})}
                    else {
                        this.setState({oponent:element.player.email, oponentGPId: element.id})
                    }
                });
                this.loadSalvoesOnGrid();
                this.loadHitsOnGrid();
            });

    }

    loadShipsOnGrid(){
        this.state.gamePlayerResponse.ships.forEach((element) => {
            element.locations.forEach((location) => {document.getElementById("sh-" + location).classList.add("with-ship")})
        })
    }

    loadSalvoesOnGrid(){
        var salvoesDict = this.state.gamePlayerResponse.salvoes[this.props.match.params.id];

        for (var key in salvoesDict) {
            salvoesDict[key].forEach((element) => {
                document.getElementById("sa-" + element).innerHTML = key;
                document.getElementById("sa-" + element).classList.add("salvoFired");
            })
        }
    }

    loadHitsOnGrid(){
        var hitsDict = this.state.gamePlayerResponse.salvoes[this.state.oponentGPId];
        for (var key in hitsDict) {
            hitsDict[key].forEach((element) => {
                var hitOnGrid = document.getElementById("sh-" + element);
                if (hitOnGrid.classList.contains("with-ship")) {
                    hitOnGrid.classList.remove("with-ship");
                    hitOnGrid.innerHTML = key;
                    hitOnGrid.classList.add("salvoHit");
                }
            })
        }
    }

    loadGrid(ships_or_salvoes){

        var letterArray = ["Z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        var buttons;
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

    componentDidMount(){
        this.loadLocations();
    }



    render(){
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <h3>Ship Locations!</h3>
                <div>Hello, player {this.state.player}</div>
                <div>Your oponent is {this.state.oponent}</div>
                {this.state.gamePlayerResponse.ships.map((ship, index) =>
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

export default ShipLocations;
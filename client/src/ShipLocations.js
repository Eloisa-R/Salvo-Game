import React from 'react';

class ShipLocations extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            gamePlayerResponse: "",
            player: "",
            oponent: ""
        }
    this.loadLocations = this.loadLocations.bind(this);
    this.loadShipsOnGrid = this.loadShipsOnGrid.bind(this);
    }

    loadLocations(){
        fetch('http://localhost:8080/api/game_view/' + this.props.match.params.id, {headers: {'Access-Control-Allow-Origin':'*'}})
            .then(response => response.json())
            .then((data) => {
                this.setState({gamePlayerResponse: data, isLoading: false})
                this.loadShipsOnGrid();
                this.state.gamePlayerResponse.gamePlayers.forEach((element) => {
                    if (element.id == this.props.match.params.id) {
                        this.setState({player:element.player.email})}
                    else {
                        this.setState({oponent:element.player.email})
                    }
                })
            });

    }

    loadShipsOnGrid(){
        this.state.gamePlayerResponse.ships.forEach((element) => {
            element.locations.forEach((location) => {document.getElementById(location).classList.add("with-ship")})
        })
    }

    loadGrid(){

        var letterArray = ["Z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        var buttons;
        function generateRow(letter, index_key){
            buttons = letterArray.map((element, index) =>
            { if (letter === "Z" && index !==0) {
                    return <button key={index} className="square" id={letter + index}>{index}</button>
                } else if (letter !== "Z" && index === 0) {
                    return <button key={index} className="square" id={letter + index}>{letter}</button>
                } else {
                    return <button key={index} className="square" id={letter + index}/>
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
                <div className="grid">{this.loadGrid()}</div>
            </div>
        );
    }
}

export default ShipLocations;
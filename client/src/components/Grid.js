import React from 'react';
import Square from './Square'


class Grid extends React.Component{

    constructor(props){
        super(props);

        this.loadGrid = this.loadGrid.bind(this);
        this.generateRow = this.generateRow.bind(this);
    }

    generateRow(letter, index_key, ships_or_salvoes, prov_array){
        let shipsArray = this.getShipslocation();
        let salvoesArray = this.getSalvoesAndHitsLocation(this.props.playerId)
        let hitsArray = this.getSalvoesAndHitsLocation(this.props.oponentId)
        let letterArray = ["Z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        let value;
        let type;
        let buttons;
        buttons = letterArray.map((element, index) =>
        {
            value = (letter === "Z" && index !==0) ? index : (letter !== "Z" && index === 0) ? letter : "";
            let coordinates = letter + index;

            return <Square key={index} handleSquareDrop={this.props.handleSquareDrop} id={ships_or_salvoes + "-"+ coordinates} positions={this.props.takenPositions} letter={letter} index={index} value={value} type={this.props.gridType}/>
        })

        return <div className="row" key={index_key}>{buttons}</div>
    }


    loadGrid(){


        let letterArray = ["Z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

        return letterArray.map((element, index) => this.generateRow(element, index, this.props.gridType, this.props.prov_array))
    }

    getShipslocation(){
        let shipsArray = [];
        this.props.data.ships.forEach((element) => {
            element.locations.forEach((location) => {shipsArray.push(location)})
        })
        return shipsArray;
    }

    getSalvoesAndHitsLocation(id){
        let salvoesOrHitsDict = this.props.data.salvoes[id];
        let salvoesOrHitsArray = [];
        for (let key in salvoesOrHitsDict) {
            salvoesOrHitsDict[key].forEach((element) => {
                salvoesOrHitsArray.push([key, element])
            })
        }
        return salvoesOrHitsArray;
    }


    render() {
        return (

                <div className="grid"><h4>{this.props.title}</h4>{this.loadGrid()}</div>

        );
    }
}

export default Grid;

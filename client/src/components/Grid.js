import React from 'react';
import Square from './Square'


class Grid extends React.Component{

    loadGrid(ships_or_salvoes){
        let shipsArray = this.getShipslocation();
        let salvoesArray = this.getSalvoesAndHitsLocation(this.props.playerId)
        let hitsArray = this.getSalvoesAndHitsLocation(this.props.oponentId)

        let letterArray = ["Z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        let buttons;
        function generateRow(letter, index_key){
            let value;
            let type;
            buttons = letterArray.map((element, index) =>
            {
                value = (letter === "Z" && index !==0) ? index : (letter !== "Z" && index === 0) ? letter : "";
                let coordinates = letter + index;
                if (ships_or_salvoes === "sh" && shipsArray.includes(coordinates) && (hitsArray.filter(e => e.includes(coordinates)).length == 0)) {
                    type = "ship"
                } else if (ships_or_salvoes === "sh" && shipsArray.includes(coordinates) && (hitsArray.filter(e => e.includes(coordinates)).length != 0)) {
                    type = "hit"
                    value = hitsArray.filter(e => e.includes(coordinates))[0][0]
                } else if(ships_or_salvoes === "sa" && (salvoesArray.filter(e => e.includes(coordinates)).length != 0)) {
                    type= "salvo"
                    value = salvoesArray.filter(e => e.includes(coordinates))[0][0]
                } else {
                    type= "normal"
                }

              return <Square key={index} id={ships_or_salvoes + "-"+ coordinates} value={value} type={type}/>
            })

            return <div className="row" key={index_key}>{buttons}</div>
        }
        return letterArray.map((element, index) => generateRow(element, index))
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
            <div>
                <div className="grid"><h4>{this.props.title}</h4>{this.loadGrid(this.props.gridType)}</div>
            </div>
        );
    }
}

export default Grid;

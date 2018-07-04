import React from 'react';
import Grid from "./Grid";

class Results extends React.Component{
    render(){
        return(<div className="fire-salvoes">
            <div>
            <div className="grids-results">
                <Grid data={this.props.data} title={"My Ships"} gridType={"sh"}
                      sunkenPositions={this.props.sunkenPositions} takenPositions={this.props.allShipsArray} toBeRemoved={[]}/>
                <Grid data={this.props.data} title={"My Salvoes Fired"} gridType={"sa"}
                      takenPositions={this.props.mySalvoesArray} newTakenPositions={[]} toBeRemoved={[]}/>
            </div>
            </div>
            <div className="button-and-results">
            <button onClick={this.props.onClikFireSalvoes}>Fire Next Round of Salvoes</button>
            <div className="round-results">
                <div>Opponent got hit on the following ships: {this.props.showHits}</div>
                <div>Opponent sunk ships: {this.props.showSunkenShips}</div>
            </div>
            </div>
            </div>)
    }
}

export default Results;
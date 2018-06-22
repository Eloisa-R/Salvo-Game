import React from 'react';
import Grid from "./Grid";

class Results extends React.Component{
    render(){
        return(<div className="fire-salvoes">
            <div>
            <Grid data={this.props.data} title={"My Ships"} gridType={"sh"}
                  sunkenPositions={this.props.sunkenPositions} takenPositions={this.props.allShipsArray}/>
            <Grid data={this.props.data} title={"My Salvoes Fired"} gridType={"sa"}
                  takenPositions={this.props.mySalvoesArray}/>
            </div>
            <button onClick={this.props.onClikFireSalvoes}>Fire Next Round of Salvoes</button>
             </div>)
    }
}

export default Results;
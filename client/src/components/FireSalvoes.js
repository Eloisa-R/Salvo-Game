import React from 'react';
import Grid from "./Grid";

class FireSalvoes extends React.Component{
    render(){ return(
        <div>
            <h4>Now Fire some Salvoes!</h4>
            <div>Click on the squares to fire up to 5 times, then click Submit when you're ready!</div>
            <div>{Array.from(this.props.salvoPositions).map(el => <button key={el} onClick={() => this.props.handleUndoSalvo(el)} className="undo-salvo">Undo {el}</button>)}</div>
            <div className="salvoes-grid-and_submit">
            <Grid clickSalvo={this.props.handleClickSalvo} takenPositions={this.props.takenPositions}
                  gridType={this.props.gridType} newTakenPositions={this.props.newTakenPositions}/>
            <button className="submit-salvoes" onClick={this.props.handleSubmitSalvo}>Submit</button>
            </div>
        </div>
    )

        }
}

export default FireSalvoes;
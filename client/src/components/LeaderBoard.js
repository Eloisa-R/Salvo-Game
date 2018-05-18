import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class LeaderBoard extends React.Component{

    render(){
        return(
            <div className="leaderboard">
                <h3>Leaderboard</h3>
                <BootstrapTable keyField='email' data={ this.props.scores } columns={ this.props.columns } />
            </div>
        )
    }
}

export default LeaderBoard;
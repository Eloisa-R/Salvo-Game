import React from 'react';

class ShipLocations extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            locations: ""
        }
    this.loadLocations = this.loadLocations.bind(this);

    }

    loadLocations(){
        fetch('http://localhost:8080/api/game_view/' + this.props.match.params.id, {headers: {'Access-Control-Allow-Origin':'*'}})
            .then(response => response.json())
            .then((data) => {
                this.setState({locations: data, isLoading: false})});

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
                {this.state.locations.ships.map((ship, index) =>
                    <div key={index}>{ship.type}, {ship.locations}</div>
                )}
            </div>
        );
    }
}

export default ShipLocations;
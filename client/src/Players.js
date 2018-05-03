import React from 'react';

 class Players extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          players: [],
          isLoading: false,
          fnValue: "",
          lnValue: "",
          email: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadPlayers = this.loadPlayers.bind(this);
      }


     handleChange(event) {
       this.setState({[event.target.id]: event.target.value});
     }

     handleSubmit(event) {
       event.preventDefault();
       fetch('http://localhost:8080/rest/players', {
         method: 'POST',
         headers: {
           'Access-Control-Allow-Origin':'*',
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
          dataType: "json",
         body: JSON.stringify({
           firstName: this.state.fnValue,
           lastName: this.state.lnValue,
           userName: this.state.email,
         })
       }).then(response => response.json())
                       .then((data) => {this.loadPlayers()})

     }

     loadPlayers(){
      fetch('http://localhost:8080/rest/players', {headers: {'Access-Control-Allow-Origin':'*'}})
             .then(response => response.json())
             .then((data) => {
             this.setState({players: data, isLoading: false})});

     }

   componentDidMount() {
     this.setState({isLoading: true});
     this.loadPlayers();
   }

    render() {
      const {players, isLoading} = this.state;

      if (isLoading) {
        return <p>Loading...</p>;
      }

      return (
          <div>
            <h3>Add New Players</h3>
            <form onSubmit={this.handleSubmit}>
               <label>
                      First name:
                <input type="text" value={this.state.fnValue} id="fnValue" onChange={this.handleChange} />
                </label>
                <label>
                     Last name:
                <input type="text" value={this.state.lnValue} id="lnValue" onChange={this.handleChange} />
                </label>
                <label>
                     E-mail:
                <input type="text" value={this.state.email} id="email" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add" />
            </form>
            <h2>Player List</h2>
            {this.state.players.map((player, index) =>
              <div key={index}>
                Name: {player.firstName} {player.lastName}, email: {player.userName}
              </div>
            )}
          </div>
      );
    }
}

export default Players;

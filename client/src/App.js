import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

    interface AppProps {
    }

    interface AppState {
      players: Array<Player>;
      isLoading: boolean;
    }

 class App extends React.Component<AppProps, AppState> {

      constructor(props: AppProps) {
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
       fetch('http://localhost:8080/players', {
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
      fetch('http://localhost:8080/players', {headers: {'Access-Control-Allow-Origin':'*'}})
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
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
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
        </div>
      );
    }
}

export default App;

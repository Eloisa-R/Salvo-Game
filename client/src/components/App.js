import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './App.css';
import Games from './Games';
import ShipLocations from "./ShipLocations";
import Test from "./Test"


 class App extends React.Component{

    render() {
      return (
        <div className="App">
          <header className="App-header">
              <img src={require('../fortress.png')} alt="salvo-title" className="title-image"/>
              <div className="App-title">Player's Unkwown Battleships</div>
          </header>
          <div className="main-content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Games}/>
              <Route path="/games" component={Games}/>
              <Route path="/shiplocations/:id" component={ShipLocations}/>
              <Route path="/test" component={Test}/>
            </Switch>
          </BrowserRouter>
          </div>
        </div>
      );
    }
}

export default App;

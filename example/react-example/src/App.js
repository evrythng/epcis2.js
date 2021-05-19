import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { EPCISDocument } from 'epcis2.js';

class App extends Component {
  render() {

    const doc = new EPCISDocument();
    console.log(doc.toString());

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

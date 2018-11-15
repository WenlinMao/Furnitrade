import React, { Component } from 'react';
// import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App">
          <Routes/>
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {  BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignUpPage';
import ProfilePage from './containers/ProfilePage';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Route exact path="/"  component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
        </div>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

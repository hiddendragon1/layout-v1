import React, { Component } from 'react';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Reboot from 'material-ui/Reboot';

import MainSideBar from './containers/MainSideBar';
import PostCard from './components/PostCard';


import './App.css';

class App extends Component {
  render() {
    return (
        <MainSideBar>
          <Reboot/>
          <PostCard 
             name="Kai"
             subheader="some description"
             title="The first Post of the day!" 
             imgUrl="/static/good.jpg"/>
          <PostCard
             name="Ti"
             subheader="Wow Look at this Tiger"
             title="A tiger Post!" 
             imgUrl="/static/tiger.jpeg"/>
          <PostCard
             name="Peter"
             subheader="some description again"
             title="Another mountain Picture" 
             imgUrl="/static/milford.jpg"/>

          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/><br/><br/>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p><p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p><p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </MainSideBar>
     

    );
  }
}

export default App;

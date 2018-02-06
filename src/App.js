import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import MainSideBar from './containers/MainSideBar';
import PostCard from './components/PostCard';
import NewPost  from './components/posts/NewPost'

import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MainSideBar>
          <Reboot/>
          <NewPost/>
          <PostCard 
             name="Kai"
             subheader="some description"
             title="This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like." 
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
        </MainSideBar>
      </MuiThemeProvider>
     

    );
  }
}

export default App;

import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import MainSideBar from './containers/MainSideBar';

import PostNew  from './components/posts/PostNew';
import PostList from './components/posts/PostList';

import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

class App extends Component {
  constructor() {
    super();
    this.state= {
      data: [
      { id: 1, 
        author: "Kai", 
        title: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
        subheader: "01-02-2018",
        imgUrl: "/static/good.jpg"
      },
      { id: 2, 
        author: "Jordan Walke", 
        title: "A tiger Post!",
        subheader: "02-12-2018",
        imgUrl: "/static/tiger.jpeg"
      },
      { id:3,
        author: "Peter",
        subheader:"02-25-2018",
        title:"Another mountain Picture" ,
        imgUrl:"/static/milford.jpg",
      }

      ]
    }

    this.addNewPost = this.addNewPost.bind(this);

  }

  addNewPost(post) {
    post.id = Date.now();
    this.state.data.push(post);
    this.setState({
        data: this.state.data
     })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MainSideBar>
          <Reboot/>
          <PostNew onAddNewPost = {this.addNewPost}/>
          <PostList data= {this.state.data}/>
        </MainSideBar>
      </MuiThemeProvider>
     

    );
  }
}

export default App;

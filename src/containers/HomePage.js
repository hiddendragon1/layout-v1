import React, { Component } from 'react';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import MainSideBar from './MainSideBar';
import PostNew  from '../components/posts/PostNew';
import PostList from '../components/posts/PostList';

import Auth from '../modules/Auth';
import axios from 'axios'

class HomePage extends Component {
  constructor() {
     //third part packages
     const Immutable = require('immutable');
     const _ = require('lodash');
    super();
    this.state= {
      //dummy data
      data: [
      // { id: 1, 
      //   author: "Kai", 
      //   title: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      //   subheader: "01-02-2020",
      //   imgUrl: "/static/good.jpg"
      // },
      // { id: 2, 
      //   author: "Jordan Walke", 
      //   title: "A tiger Post!",
      //   subheader: "02-12-2018",
      //   imgUrl: "/static/tiger.jpeg"
      // },
      // { id:3,
      //   author: "Peter",
      //   subheader:"02-25-2018",
      //   title:"Another mountain Picture" ,
      //   imgUrl:"/static/milford.jpg",
      // }

      ]
    }

    this.addNewPost = this.addNewPost.bind(this);

  }

  //fetch the Posts default by hot for Hompage
  componentWillMount() {

    //set user name
    this.author = {
      name: Auth.getUserName()
    }
    //get posts for display
    axios.get('/api/posts', {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`}
    })
    .then(response => {
      if(response.status === 200) {
        // change the component-container state
        this.setState({
          errors: {}
        });

        console.log(response.data.Posts);
        const temp = response.data.Posts;

        //set data to the temp
        this.setState({
            data: temp
         })
      }   
    })
    .catch( error => {

      console.log(error);
      // change the component state
      const errors = error.response ? error.response : {};
      errors.summary = error.message;

      this.setState({
        errors
      });

    });   
  }

  /*Method to add New Post from API route
      author: "Holder",
      subheader: Date.now(),
      title: this.state.text ,
      imgUrl: this.state.filesPreview,
   */
  addNewPost(post) {

    // const title = encodeURIComponent(post.title);
    // const imgUrl = encodeURIComponent(post.imgUrl);
    // const file = post.file;

    const formData = new FormData();
    formData.append("author", Auth.getUserId());
    formData.append("title", post.title);
    // formData.append("imgUrl", imgUrl);
    formData.append("file", post.file);
    
    // const formData = `author=${Auth.getUserId()}&title=${title}&imgUrl=${imgUrl}&file=${file}`;

    console.log(formData);

    axios.post('/api/post', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `bearer ${Auth.getToken()}`}
    })
    .then(response => {
      if(response.status === 200) {
        // change the component-container state
        this.setState({
          errors: {}
        });
        //set proper author name for display
        response.data.author = this.author;
        this.state.data.push(response.data);
        console.log(this.state.data);
        this.setState({
            data: this.state.data
         })
      }   
    })
    .catch( error => {
      // change the component state
      console.log(error);
      const errors = error.response? error.response : {};
      errors.summary = error.message;

      this.setState({
        errors
      });
    });
  }

  render() {
    //Check if user is authenticated then display welcome screen
    if(Auth.isUserAuthenticated()){
      // const userEmail = Auth.getUserEmail();
      const userName  = Auth.getUserName();
      var welcome = (<p style={{color:'red'}}> Welcome {userName}!</p>);
    } else
      var welcome = <p style={{color:'red'}}> Not authenticated</p>

    return (
	    <MainSideBar>
	      <Reboot/>
        {welcome}
	      <PostNew onAddNewPost = {this.addNewPost}/>
	      <PostList data= {this.state.data}/>
	    </MainSideBar>
    );
  }
}

export default HomePage;
import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';

import MainSideBar from './MainSideBar';
import PostNew  from '../components/posts/PostNew';
import PostList from '../components/posts/PostList';

import Auth from '../modules/Auth';
import axios from 'axios'

class ProfilePage extends Component {
  constructor() {
  	super();
	  this.state= { 
	  	data: [],
	  	value: 0
	  };
		

	}


	componentWillMount() {
		this.getPosts(`/api/user/${Auth.getUserId()}/posts`);
	}


	getPosts = (url) => {
		//axios get to API 
		axios.get(url, {
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

        console.log(response.data.posts);
        const temp = response.data.posts;

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

	handleChange = (event, value) => {
    
  	if(value ==0)
    	this.getPosts(`/api/user/${Auth.getUserId()}/posts`);
  	else if( value==1)
  		this.getPosts(`/api/user/${Auth.getUserId()}/comments`);
    else if( value==2)
      this.getPosts(`/api/user/${Auth.getUserId()}/likes`);
  	else if( value != 0 ){ 
      this.setState({ value,data:[] });
    }

    this.setState({value});
  };

  render() {
  	const { classes } = this.props;
    const { value } = this.state;
    //Check if user is authenticated then display welcome screen
    if(Auth.isUserAuthenticated()){
      // const userEmail = Auth.getUserEmail();
      const userName  = Auth.getUserName();
      var welcome = (<p style={{color:'red'}}> Welcome {userName}!</p>);
    } else
      var welcome = <p style={{color:'red'}}> Not authenticated</p>

    return (
	    <MainSideBar>
        <Tabs 
        	value={value} 
        	onChange={this.handleChange}
        	textColor="white"
        	indicatorColor="green"
        	
        >
          <Tab label="Your Posts" />
          <Tab label="Your Comments" />
          <Tab label="Your Likes"/>
          <Tab label="Settings"/>
        </Tabs>
	      <PostList data= {this.state.data}/>
	    </MainSideBar>
    );
  }
}

export default ProfilePage;
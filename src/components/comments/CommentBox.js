import React from 'react';
import { withStyles } from 'material-ui/styles';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

import Auth from '../../modules/Auth';
import axios from 'axios'


const styles = {
   commentBox: {

   }
};


class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
       data: [
          // { id: 1, author: "Pete Hunt", text: "This is one comment" },
          // { id: 2, author: "Jordan Walke", text: "This is **another** comment" }
       ]
    }
    this.addComment = this.addComment.bind(this);
    this.url = '/comments.json';
  }

  componentDidMount() {
    if(this.props.type=="comments")
      this.fetchCommentList();
    else
      this.fetchReplyList();
    // setInterval(this.fetchCommentList, 2000);
  }

  fetchReplyList() {
    const commentId = this.props.commentId;
    console.log(commentId);
    axios.get(`api/comment/${commentId}/replies`, {
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

       console.log(response.data);
       const temp = response.data;

       // set data to the temp
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



  fetchCommentList() {
     const postId = this.props.postId;
     axios.get(`/api/post/${postId}/comments`, {
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

         console.log(response.data.comments);
         const temp = response.data.comments;

         // set data to the temp
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

  addComment(comment) {

    // const formData = new FormData();
    // formData.append("author", Auth.getUserId());
    // formData.append("postId", this.props.postId);
    // formData.append("text", comment.text);

    const formData = `author=${Auth.getUserId()}&text=${comment.text}&postId=${this.props.postId}`;

    axios.post('/api/comment', formData, {
      headers: { 
        // 'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `bearer ${Auth.getToken()}`}
    })
    .then(response => {
       response.data.author = {"name": Auth.getUserName()};

       // console.log(response.data);
       this.state.data.unshift(response.data);

       this.setState({
          data: this.state.data
       })
      
    })
    .catch(function(error) {
       console.log(error);
    });
  }

  render() {
    const { classes } = this.props;
    return ( 
      <div className = { classes.commentBox }>
        <CommentForm onAddComment = { this.addComment }/> 
        <CommentList data = { this.state.data }/>
      </div>
    );
  }

}

export default withStyles(styles)(CommentBox);
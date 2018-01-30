import React from 'react';
import { withStyles } from 'material-ui/styles';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios';

const styles = {
  commentBox: {
   
  }
};


class CommentBox extends React.Component {
  constructor() {
    super();
    this.state ={
      data: [
      {id: 1, author: "Pete Hunt", text: "This is one comment"},
      {id: 2, author: "Jordan Walke", text: "This is **another** comment"}
      ]
   }
   this.addComment =  this.addComment.bind(this);
   this.url = '/comments.json';
  }

  componentDidMount() {
    this.fetchCommentList();
    // setInterval(this.fetchCommentList, 2000);
  }

  fetchCommentList() {
    console.log("fetchCommentList");
    axios.get(this.url)
     .then(response => {
        this.setState({data: response.data});
     })
     .catch(function(error){
        console.log(error);
     });
  }

  addComment(comment) {
     comment.id = Date.now();
     this.state.data.push(comment);

     this.setState({
        data: this.state.data
     })
     axios.post(this.url,comment)
     .then(response => {
        this.setState({data: response.data});
     })
     .catch(function(error){
        console.log(error);
     });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.commentBox}>
          <CommentForm onAddComment = {this.addComment}/>
          <CommentList data={this.state.data}/>       
      </div>
    );
  }

}

export default withStyles(styles)(CommentBox);
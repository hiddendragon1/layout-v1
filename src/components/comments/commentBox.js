import React from 'react';
import { withStyles } from 'material-ui/styles';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

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
    return (
      <div className="commentBox">
        <h3 style={{margin:'0px'}}>Comments</h3>
        <CommentList data={this.state.data}/>
        <CommentForm onAddComment = {this.addComment}/>
      </div>
    );
  }

}

export default withStyles(styles, {withTheme:true})(CommentBox);
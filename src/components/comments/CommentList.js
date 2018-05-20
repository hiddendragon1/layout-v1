import React from 'react';
import { withStyles } from 'material-ui/styles';
import Comment from './Comments';
import List from 'material-ui/List';

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


class CommentList extends React.Component {

  render() {
  	var commentList = this.props.data.map(function(comment,index) {
		  return (
  			<Comment author={comment.author.name} key={comment._id} replies={comment.replies} commentId={comment._id}>
  				{comment.text}
  			</Comment>
		  );
  	});

	return (
		<List component="div" disablePadding>
		   {commentList}
		</List>
	);
  }	

}

export default withStyles(styles, {withTheme:true})(CommentList);
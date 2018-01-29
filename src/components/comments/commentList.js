import React from 'react';
import Comment from './Comments';
import List from 'material-ui/List';

class CommentList extends React.Component {
  constructor() {
    super();

   
  }

  render() {
  	var commentList = this.props.data.map(function(comment) {
  		return (
			<Comment author={comment.author} key={comment.id}>
				{comment.text}
			</Comment>
		);
  	});

	return (
		<List component="div">
		   {commentList}
		</List>
	);
  }	

}

export default CommentList;
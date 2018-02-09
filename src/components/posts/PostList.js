import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

import PostCard from './PostCard';


class PostList extends React.Component {
   constructor() {
   super();
   this.state = {
     expanded: true,
     comments: false
   };
  }


  render() {
  	var postList = this.props.data.map(function(post) {
  		return (
			<PostCard 
				name={post.author}
				subheader={post.subheader}
				title={post.title}
				imgUrl={post.imgUrl}
				key={post.id} 
			/>
		);
  	});
  	return (
  		<List>
  			{postList}
  		</List>
	);
  }


}

export default PostList;
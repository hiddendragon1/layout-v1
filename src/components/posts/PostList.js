import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

import PostCard from './PostCard';


class PostList extends React.Component {
  render() {
  	var postList = this.props.data.map(function(post) {
  		console.log("in postlist",post._id);

  		return (
			<PostCard 
				name={post.author.name}
				subheader={post.createdAt}
				title={post.title}
				imgUrl={post.imgUrl}
				key={post._id} 
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
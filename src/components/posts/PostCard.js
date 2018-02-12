import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import classnames from 'classnames';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';

import CommentBox from '../comments/CommentBox';
import PostActions from './PostActions';
import PostCardHeader from './PostCardHeader';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  card: {
    maxWidth: '70%',
    margin: '25px 10px',
    background: '#0a2a5a',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 0px',
      maxWidth: '100%',
    },
  },
  media: {
    height: 250,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "#3f51b5",
    color: 'white'
  },
  comments: {
  	marginLeft: 'auto',
  },
  commentBox: {
    background: '#656565',
  }

});

class PostCard extends React.Component {
  constructor() {
   super();
   this.state = {
     expanded: true,
     comments: false,
     numComments: 5,
     numLikes: 128
   };
   // this.handleExpandClick = this.handleExpandClick.bind(this);
   // this.handleCommentExpandClick = this.handleCommentExpandClick.bind(this);
   // this.handleThumbsClick = this.handleThumbsClick.bind(this);
   // this.handleAppClicks = this.handleAppClicks.bind(this);
  }

  componentDidMonunt() {

  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleCommentExpandClick = () => {
    this.setState({ comments: !this.state.comments });
  };

  handleThumbsClick = (change) =>{
    const newLikes = this.state.numLikes + change;
    this.setState({numLikes: newLikes});
  }

  render() {
  	const { classes,name,title, subheader } = this.props;

  	return (
	    
	   <Card className={classes.card} raised>
	    <PostCardHeader
        expandClick = {this.handleExpandClick} 
        state={this.state.expanded}
        name={name}
        title={title}
        subheader={subheader} />

	    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
	      {this.props.imgUrl? <CardMedia
            className={classes.media}
            image={this.props.imgUrl}
            title="an image"
        />: '' }
        <CardContent>
            <Typography>
              This impressive paella is a perfect party dish and a fun meal to 
              cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
             </CardContent>
        
          <PostActions 
            expandClick = {this.handleCommentExpandClick}
            thumbsClick = {this.handleThumbsClick} 
            state={this.state.comments} 
            likes={this.state.numLikes}
            comments={this.state.numComments} />
       
        <Collapse in={this.state.comments} timeout="auto" unmountOnExit>
          <CardContent className={classes.commentBox}>
            <CommentBox/>
          </CardContent>
        </Collapse>
      </Collapse>
	   </Card>
	  

  	);
  }

}

export default withStyles(styles)(PostCard);

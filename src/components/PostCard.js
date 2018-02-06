import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Button from 'material-ui/Button';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import MoreVertIcon from 'material-ui-icons/MoreVert';

import CommentBox from './comments/CommentBox'
import PostActions from './posts/PostActions'


const styles = theme => ({
  card: {
    maxWidth: '70%',
    margin: 25,
    background: '#0a2a5a'
  },
  media: {
    height: 200,
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
     comments: false
   };
   this.handleExpandClick = this.handleExpandClick.bind(this);
   this.handleCommentExpandClick = this.handleCommentExpandClick.bind(this);
   // this.handleAppClicks = this.handleAppClicks.bind(this);
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleCommentExpandClick = () => {
    this.setState({ comments: !this.state.comments });
  };

  render() {
  	const { classes } = this.props;
  	return (
	    
	   <Card className={classes.card} raised>
	    <CardHeader avatar={
  	      <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.name}
       	  </Avatar>}
       	 action = {<IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>

          }
         title={this.props.title}
         subheader={this.props.subheader}
	    />
	    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
	      <CardMedia
            className={classes.media}
            image={this.props.imgUrl}
            title="Mountain Picture Somewhere"
        />
        <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
        </CardContent>
        <PostActions 
          expandCommentClick = {this.handleCommentExpandClick} 
          commentState={this.state.comments} />

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

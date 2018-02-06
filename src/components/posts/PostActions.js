import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Button from 'material-ui/Button';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

const styles = theme => ({
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

});


const PostActions =({ expandCommentClick, commentState,classes }) => (
	<CardActions className={classes.actions} disableActionSpacing>
	  <IconButton aria-label="Add to favorites">
	    <FavoriteIcon />
	  </IconButton>
	  <IconButton aria-label="Share">
	    <ShareIcon />
	  </IconButton>

	  <Button raised color="secondary" 
	      className={classnames(classes.expand)}
	      onClick={expandCommentClick}
	      aria-expanded={commentState}
	      aria-label="Show Comments"
	  >
	   Comments
	   <ExpandMoreIcon className={classnames(classes.expand, {
	        [classes.expandOpen]: commentState,
	      })}/>
	  </Button>
	</CardActions>
);


export default withStyles(styles,{ withTheme:true })(PostActions);
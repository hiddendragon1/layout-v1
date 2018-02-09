import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Button from 'material-ui/Button';
import ShareIcon from 'material-ui-icons/Share';
import CommentIcon from 'material-ui-icons/Comment';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import { CardActions } from 'material-ui/Card';

const styles = theme => ({
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
   
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

});

const PostActions =({ expandClick, state,classes }) => (
	<CardActions className={classes.actions} disableActionSpacing>
	  <IconButton aria-label="Add to favorites">
	    <FavoriteIcon />
	  </IconButton> 
  		<Typography>
			128 likes
		</Typography>
	  <IconButton color={state? 'secondary':'default'}
	      className={classnames(classes.expand)}
	      onClick={expandClick}
	      aria-expanded={state}
	      aria-label="Show Comments"
	  ><CommentIcon/> 
	  </IconButton>
		<Typography onClick={expandClick} style={{cursor:'pointer'}}>
		4 comments
		</Typography>
  	  <IconButton aria-label="Share">
	    <ShareIcon />
	  </IconButton>
	</CardActions>
);


export default withStyles(styles,{ withTheme:true })(PostActions);
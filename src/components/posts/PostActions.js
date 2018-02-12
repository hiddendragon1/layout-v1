import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ThumbupIcon from 'material-ui-icons/ThumbUp';
import ThumbdownIcon from 'material-ui-icons/ThumbDown';
import Button from 'material-ui/Button';
import ShareIcon from 'material-ui-icons/Share';
import CommentIcon from 'material-ui-icons/Comment';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
// import SvgIcon from 'material-ui/SvgIcon';
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

// const FireIcon = props => (
// 	<SvgIcon {...props}>

// 		<path d="M156.45,351.309c8.564,12.272,19.368,23.935,32.404,34.972c13.039,11.036,26.215,20.553,39.543,28.547    c13.326,7.998,28.553,15.893,45.682,23.702l-0.287-0.287l1.143,0.287c-12.754-24.365-19.128-45.679-19.128-63.953    c0-9.709,2.334-18.894,7-27.549c4.661-8.664,10.749-16.426,18.268-23.271c7.522-6.851,15.848-13.702,24.982-20.554    c9.133-6.857,18.267-14.232,27.411-22.127c9.134-7.898,17.463-16.276,24.981-25.126c7.519-8.852,13.606-19.558,18.274-32.12    c4.661-12.563,6.995-26.269,6.995-41.112c0-18.654-2.621-36.164-7.851-52.534c-5.235-16.368-12.135-30.693-20.697-42.968    c-8.562-12.275-19.362-23.935-32.408-34.97c-13.038-11.04-26.214-20.557-39.539-28.549C269.897,15.703,254.671,7.804,237.543,0    l0.284,0.288L236.971,0c12.56,24.741,18.839,46.061,18.839,63.95c0,9.707-2.331,18.892-6.995,27.55    c-4.665,8.66-10.754,16.415-18.271,23.269c-7.52,6.851-15.846,13.703-24.982,20.557c-9.139,6.851-18.276,14.228-27.411,22.126    c-9.136,7.898-17.462,16.274-24.982,25.122c-7.517,8.852-13.606,19.558-18.271,32.12c-4.661,12.563-6.995,26.269-6.995,41.112    c0,18.654,2.611,36.165,7.846,52.533C140.985,324.708,147.886,339.037,156.45,351.309z" fill="#FFFFFF"/>
// 		<path d="M454.092,477.788c-1.811-1.803-3.949-2.703-6.42-2.703H63.95c-2.474,0-4.615,0.9-6.423,2.703    c-1.809,1.808-2.712,3.949-2.712,6.424v18.271c0,2.479,0.903,4.617,2.712,6.427c1.809,1.811,3.949,2.711,6.423,2.711h383.722    c2.471,0,4.609-0.9,6.42-2.711c1.807-1.81,2.714-3.948,2.714-6.427v-18.271C456.806,481.737,455.905,479.596,454.092,477.788z" fill="#FFFFFF"/>
	
// 	</SvgIcon>
// )

const PostActions =({ expandClick, thumbsClick,state,classes,likes,comments }) => (
	<CardActions className={classes.actions} disableActionSpacing>
	  <IconButton aria-label="Add to favorites" value="1" onClick={thumbsClick.bind(this,1)}>
	    <ThumbupIcon />
	  </IconButton> 
	  <IconButton aria-label="dislike" value="-1" onClick={thumbsClick.bind(this,-1)}>
		<ThumbdownIcon />
	  </IconButton>
  		<Typography>
			{likes} likes
		</Typography>
	  <IconButton color={state? 'secondary':'default'}
	      className={classnames(classes.expand)}
	      onClick={expandClick}
	      aria-expanded={state}
	      aria-label="Show Comments"
	  ><CommentIcon/> 
	  </IconButton>
		<Typography onClick={expandClick} style={{cursor:'pointer'}}>
		{comments} comments
		</Typography>
  	  <IconButton aria-label="Share">
	    <ShareIcon />
	  </IconButton>
	</CardActions>
);


export default withStyles(styles,{ withTheme:true })(PostActions);
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
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: '80%',
    margin: 25
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
    backgroundColor: "red",
  },
  moreVert: {
  	marginLeft: 'auto',
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
	  <div>
	   <Card className={classes.card}>
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
        <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
              </IconButton>
    
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.comments,
              })}
              onClick={this.handleCommentExpandClick}
              aria-expanded={this.state.comments}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
     	  </CardActions>
          <Collapse in={this.state.comments} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                Comment Box Here? 
              </Typography>
              <Typography paragraph>
                 Some More Comments Components here.
              </Typography>
            </CardContent>
            </Collapse>
          </Collapse>
	   </Card>
	  </div>
  	);
  }

}

export default withStyles(styles)(PostCard);

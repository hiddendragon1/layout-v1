import React from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react'
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui-icons/Reply';
import { ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import ThumbupIcon from 'material-ui-icons/ThumbUp';
import ThumbdownIcon from 'material-ui-icons/ThumbDown';

import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import CommentBox from '../comments/CommentBox';


const styles = theme => ({
  root: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1rem',
  },
  container: {
    borderRadius: 30,
    marginTop: 10,
    border: '1px white solid',
    color:'white'
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
 
  },
  replyBtn: {
  	color: 'white',
  	fontSize: '2rem'
  },
  actions: {
    display: 'flex',
  },
});

class Comment extends React.Component  {

	constructor() {
      super();
      this.state = {
          replies: false,
      }
    }

	rawMarkup() {
		var md = new Remarkable();
		 md.renderer = new RemarkableReactRenderer();
		var rawMarkup = md.render(this.props.children.toString());
		return rawMarkup ;
	}

  handleCommentExpandClick = () => {
    this.setState({ replies: !this.state.replies });
  }

	render() {
	const {classes,replies,commentId}  = this.props		
		return ( 
		<div>
			<ListItem  
			  component='div' 
			  className={classnames(classes.root,classes.container)}
			>
				<ListItemAvatar>
					<Avatar src='/static/Image.jpeg' className={classes.bigAvatar}/>
				</ListItemAvatar>
				<ListItemText
					primary={<span><h5>{this.props.author}</h5>  {this.rawMarkup()}</span>}
					disableTypography
				/>
				<ListItemSecondaryAction className={classes.actions}>
					<IconButton aria-label="Add to favorites" value="1" >
			    <ThumbupIcon />
				  </IconButton> 
				  <IconButton aria-label="dislike" value="-1" >
					<ThumbdownIcon />
		  		</IconButton>
		  		<Typography onClick={this.handleCommentExpandClick} style={{cursor:'pointer'}}>
						{replies} replies
					</Typography>

				

				</ListItemSecondaryAction>
			</ListItem>

			<Card>
		  		<Collapse in={this.state.replies} timeout="auto" unmountOnExit>
          <CardContent className={classes.commentBox}>
            <CommentBox commentId={commentId} type="replies" />
          </CardContent>
        	</Collapse>
        	</Card>
			</div>

		);
	}	
 
}


export default withStyles(styles, {withTheme:true})(Comment);
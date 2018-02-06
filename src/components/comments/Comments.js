import React from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react'
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui-icons/Reply';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';


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
  }
});

class Comment extends React.Component  {

	rawMarkup() {
		var md = new Remarkable();
		 md.renderer = new RemarkableReactRenderer();
		var rawMarkup = md.render(this.props.children.toString());
		return rawMarkup ;
	}

	render() {
	const {classes}  = this.props		
		return ( 
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
				<ListItemSecondaryAction>
					<IconButton aria-label="Reply" color="inherit" className={classes.replyBtn}>
						<ReplyIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}	
 
}


export default withStyles(styles, {withTheme:true})(Comment);
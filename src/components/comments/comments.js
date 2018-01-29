import React from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react'
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui-icons/Reply';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class Comment extends React.Component  {

	rawMarkup() {
		var md = new Remarkable();
		 md.renderer = new RemarkableReactRenderer();
		var rawMarkup = md.render(this.props.children.toString());
		return rawMarkup ;
	}

	render() {		
		return ( 
			<ListItem divider component='div'>
				<ListItemAvatar>
					<Avatar>
						{this.props.author[0]}
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={<h5>{this.props.author}</h5>}
					secondary= {this.rawMarkup()}
					disableTypography
				/>
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete">
						<ReplyIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}	
 
}


export default Comment;
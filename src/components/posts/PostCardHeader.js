import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
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

});

const PostCardHeader = ({ classes,state, expandClick,name,title,subheader}) => (
	<CardHeader avatar={
		<Avatar aria-label="Recipe" className={classes.avatar}>
          {name[0]}
		</Avatar>}
   	 		action = {<IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: state,
              })}
              onClick={expandClick}
              aria-expanded={state}
              aria-label="Show more">
               <ExpandMoreIcon/>
             </IconButton>
          	}
         title={title}
         subheader={subheader}
    />
);


export default withStyles(styles,{ withTheme:true })(PostCardHeader);



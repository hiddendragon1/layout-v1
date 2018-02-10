import React from 'react';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AppsIcon from 'material-ui-icons/Apps';


const drawerWidth = 200;

const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    position:'fixed'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navIconRight: {
  	fontSize: '2em'
  },
  appHeader: {
  	justifyContent: 'flex-end',
  	flex: 1
  }

});

const ToolBar = ({classes,theme, onClick, appOnClick}) => (
	<AppBar className={classes.appBar}>
	    <Toolbar>
	      <IconButton
	        color="inherit"
	        aria-label="open drawer"
	        onClick={onClick}
	        className={classes.navIconHide}
	      >
	        <MenuIcon />
	      </IconButton>
	      <Typography type="title" color="inherit" 
	        className={classes.appHeader}
	      	noWrap
	      >
	        Responsive drawer
	      </Typography>
	      <IconButton color="inherit" aria-label="open drawer"
	        className={classes.navIconRight}
	        onClick={appOnClick}
	      >
	   
	       	<AppsIcon/>
	  	  </IconButton>
		</Toolbar>
	</AppBar>
);

export default withStyles(styles,{ withTheme:true })(ToolBar);
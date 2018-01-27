import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';


import Menu, { MenuItem } from 'material-ui/Menu';
import Fade from 'material-ui/transitions/Fade';

import SideBarContent from '../components/SideBarContent'
import ToolBar from '../components/ToolBar'
import '../components/mainsidebar.css'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',

  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
      marginLeft: drawerWidth,
    },
  },
});

class MainSideBar extends React.Component {
  
	constructor() {
	  super();
	  this.state = {
	    mobileOpen: false,
      anchorEl: null
	  };
	  this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
	  this.handleAppClicks = this.handleAppClicks.bind(this);
	}

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleAppClicks = (event) => {
  	this.setState({ anchorEl: event.currentTarget });
  }

  handleAppClose =() => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;

    const drawer = (
      <SideBarContent/>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>

          <Menu
            id="fade-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleAppClose}
            transition={Fade}
          >
            <MenuItem onClick={this.handleAppClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleAppClose}>My account</MenuItem>
            <MenuItem onClick={this.handleAppClose}>Logout</MenuItem>
          </Menu>
          <ToolBar 
          	onClick={this.handleDrawerToggle}
          	appOnClick = {this.handleAppClicks}
          />
          <Hidden mdUp>
            <Drawer
              type="temporary"
              // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

MainSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainSideBar);
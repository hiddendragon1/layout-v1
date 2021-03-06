import React from 'react';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  drawerHeader:  {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '1.7rem',
    height: 'calc(100% - 65px)',
    '&:hover': {
      backgroundColor:'green',
      cursor: 'default'
    }
  }
});

const SideBarContent = ({classes}) => (
  <div>
    <MenuItem classes={{ root: classes.drawerHeader }}>Menu </MenuItem>

    <MenuItem ><Link to={'/'}>Home</Link> </MenuItem>
    <MenuItem >Responsive Example</MenuItem>
    <Divider/>
    <MenuItem >Mock menu item 1</MenuItem>
		<MenuItem >Mock menu item 2</MenuItem>
		<MenuItem >Mock menu item 3</MenuItem>
    <MenuItem >Profile</MenuItem>
  </div>
);


export default withStyles(styles, {withTheme:true})(SideBarContent);
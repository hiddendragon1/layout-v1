import React from 'react';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import Menu, { MenuItem, MenuList} from 'material-ui/Menu';

const styles = theme => ({

  drawerHeader:  {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '1.7rem',
    height: 'calc(100% - 65px)',
    '&:hover': {
      backgroundColor:'green',
    }
  }
  

});

const SideBarContent = ({classes}) => (
  <div>
  <MenuItem classes={{
                root: classes.drawerHeader,
              }}>Menu</ MenuItem>

    <MenuItem >Home</MenuItem >
    <MenuItem >Responsive Example</MenuItem >
    <Divider/>
    <MenuItem >Mock menu item 1</MenuItem>
		<MenuItem >Mock menu item 2</MenuItem>
		<MenuItem >Mock menu item 3</MenuItem>
    <MenuItem >Profile</MenuItem>
  </div>
);


export default withStyles(styles, {withTheme:true})(SideBarContent);
import React, { Component, useState, useEffect } from 'react';
import clsx from 'clsx';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Topbar from './TopBar'
//import Topbar from './Topbar';
import Drawer from './Drawer'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: "#ffffff",
    paddingBottom: 200
  },
  grid: {
    width: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)',
      padding: 0
    },
  },
  content: {
    flexGrow: 1,
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    }
  }
});


const PageContainer = (props) => {

  const { classes, children } = props;
  const currentPath = props.location.pathname

  const [openDrawer, setOpenDrawer] = useState(true)
  const [openDrawerMobile, setOpenDrawerMobile] = useState(false)

  const onOpenDrawer = e => {
    setOpenDrawer(!openDrawer)
  }

  const onOpenDrawerMobile = e => {
    setOpenDrawerMobile(!openDrawerMobile)
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar onDrawerButtonClick={onOpenDrawer} onDrawerButtonClickMobile={onOpenDrawerMobile} currentPath={currentPath} />
      <Grid className={classes.root} container alignItems="center" justify="center">
        <Drawer open={openDrawer} openMobile={openDrawerMobile} onMobileClose={onOpenDrawerMobile}/>
      <div className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}>
        <Grid container justify="center" >
          <Grid className={classes.grid} spacing={24} alignItems="center" justify="center" container>
              { children }
          </Grid>
        </Grid>
      </div>
      </Grid>
      
    </React.Fragment>
  );

}

export default withRouter(withStyles(styles)(PageContainer));

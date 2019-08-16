import React,  { useState, useEffect } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link as MaterialLink } from '@material-ui/core'
import Menu from './Menu';
import UserButton from './buttons/UserButton'

const logo = require('../images/logo.svg');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  },
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  userButton: {
    paddingTop: 5,
    paddingBottom: 5,
    position: 'relative',
    top: '50%'
  }
})

const Topbar = (props) => {
  const [value, setValue] = useState(0)
  const [menuDrawer, setMenuDrawer] = useState(false)

  const { classes } = props

  const handleChange = (event, value) => {
    setValue(value)
  };

  const mobileMenuOpen = (event) => {
    setMenuDrawer(true)
  }

  const mobileMenuClose = (event) => {
    setMenuDrawer(false)
  }

  const current = () => {
    if(props.currentPath === '/home') {
      return 0
    }
    if(props.currentPath === '/activities') {
      return 1
    }
    if(props.currentPath === '/dashboard') {
      return 2
    }
    if(props.currentPath === '/wizard') {
      return 3
    }
    if(props.currentPath === '/cards') {
      return 4
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
          <Grid container spacing={24} alignItems="baseline">
            <Grid item xs={12} className={classes.bar}>
                <div className={classes.flex}>
                <div className={classes.inline}>
                  <Typography variant="h6" color="inherit" noWrap>
                    <Link to='/' className={classes.link}>
                      <img width={20} src={logo} alt="" />
                      <span className={classes.tagline}>中珠数院</span>
                    </Link>
                  </Typography>
                </div>
                { !props.noTabs && (
                  <React.Fragment>
                    <div className={classes.productLogo}>
                      <Typography>
                        数院活动平台
                      </Typography>
                    </div>
                    <div className={classes.iconContainer}>
                      <IconButton onClick={mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <div className={classes.tabContainer}>
                      <SwipeableDrawer anchor="right" open={menuDrawer} onClose={mobileMenuClose} onOpen={mobileMenuOpen}>
                        <AppBar title="Menu" />
                        <List>
                          {Menu.map((item, index) => (
                            <ListItem component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : {pathname: item.pathname, search: props.location.search}} button key={item.label}>
                              <ListItemText primary={item.label} />
                            </ListItem>
                          ))}
                        </List>
                      </SwipeableDrawer>
                      <Tabs
                        value={current() || value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                      >
                        {Menu.map((item, index) => (
                          <Tab key={index} component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : {pathname: item.pathname, search: props.location.search}} classes={{root: classes.tabItem}} label={item.label} />
                        ))}
                      </Tabs>
                    </div>
                  </React.Fragment>
                )}
                </div>
                <div className={ classes.userButton }>
                 <UserButton/>
                </div>
            </Grid>
          </Grid>
      </Toolbar>
    </AppBar>
  )

}

export default withRouter(withStyles(styles)(Topbar))

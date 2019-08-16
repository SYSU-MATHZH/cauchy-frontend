import React, { useState, useEffect } from 'react'

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import useGlobal from '../../store'

const UserButton = () => {
    const [global, actions] = useGlobal()
    const { user } = global

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    function handleMenu(event) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
    }

    const logout = async () => {
        await actions.user.logout()
    }

    useEffect(() => {
        if (user.status === 'AUTHED')
            actions.user.user('GET', user.url)
    }, [])

    if (user.status === 'UNAUTHED')
        return <></>

    return (
        <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>{ user.username }</MenuItem>
          <MenuItem onClick={logout}>登出</MenuItem>
        </Menu>
      </div>
    )
}

export default UserButton
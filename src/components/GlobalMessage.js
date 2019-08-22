import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useGlobal from '../store'

const useStyles = makeStyles(theme => ({
    close: {
      padding: theme.spacing(0.5),
    },
  }));

const DURATION = 1500

const GlobalMessage =  () => {
    const [global, actions] = useGlobal()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (global.message.length > 0 && !open) {
            // console.log(`showing message ${global.message[0]}`)
            setMessage(global.message[0])
            setOpen(true)
        }

    }, [global.message])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        if (global.message.length > 0) {
            actions.popMessage()
        }
        // console.log('close')
    }

    const classes = useStyles();
    return (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={ DURATION }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ message }</span>}
        action={
            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
        }
      />
    )
}

export default GlobalMessage;
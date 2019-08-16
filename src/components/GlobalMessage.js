import React, { useState, useEffect } from 'react'

import Snackbar from '@material-ui/core/Snackbar';

import useGlobal from '../store'

const SHOWINTERVAL = 1500

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

    return (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={ SHOWINTERVAL }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ message }</span>}
      />
    )
}

export default GlobalMessage;
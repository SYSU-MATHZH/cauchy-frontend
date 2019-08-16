import React, { useState, useEffect } from 'react'

import Snackbar from '@material-ui/core/Snackbar';

import useGlobal from '../store'

const GlobalMessage =  () => {
    const [global, actions] = useGlobal()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (global.message.length > 0) {
            setMessage(global.message[0])
            setOpen(true)
        }
    }, [global.message])

    const handleClose = () => {
        setOpen(false)
        actions.popMessage()
    }

    return (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ message }</span>}
      />
    )
}

export default GlobalMessage;
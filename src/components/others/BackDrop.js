import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    backdrop: {
        'background-color': '#e5e5e5'
    }
})

const FadeBackdrop = props => {
    const classes = useStyles()
    const { open, closing, onClick, ...other } = props
    const [show, setShow] = useState(open)

    const handleClick = e => {
        setShow(false)
        if (onClick) {
            onClick(e)
        }
    }

    useEffect(() => {
        if (closing) {
            setShow(false)
        }
    }, [closing])

    return (
        <Backdrop
            open={show}
            onClick={handleClick}
            {...other}
        />
    );
}

export default FadeBackdrop
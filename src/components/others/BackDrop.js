import React, { useState, useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const FadeBackdrop = props => {
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
        <Backdrop open={show} onClick={handleClick} {...other}/>
    );
}

export default FadeBackdrop
import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
import Backdrop from '../others/BackDrop'
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import { parseDate } from '../../utils';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345,
    },
    header: {
        '& span': {
            fontSize: 14,
        },
        '& div': {
            alignItems: 'center'
        }
    },
    chip: {
        marginLeft: 5,
        height: 18,
        '& span': {
            fontSize: 12,
        }
    },
    content: {
        marginTop: -16,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
  }));

const Model = (props) => {
    const DURATION = 0.3
    const classes = useStyles()
    const { data, Card, Paper } = props
    const [detail, setDetail] = useState(false)
    const [closing, setClosing] = useState(false)
    const [showCard, setShowCard] = useState(true)
    const [modalEnd, setModelEnd] = useState(false)
    const [position, setPostion] = useState([0, 0, 0, 0])
    const [modalPosition, setModalPosition] = useState([0, 0, 0, 0])

    const cardRef = useCallback(node => {
        if (node !== null) {
            const rect = node.getBoundingClientRect()
            setPostion([rect.top, rect.left, rect.width, rect.height])
        }
    }, [detail])

    const onPaperMount = node => {
        const rect = node.getBoundingClientRect()
        setModalPosition([(window.innerHeight - rect.height * 2) / 2, (window.innerWidth - rect.width * 2) / 2, rect.width * 2, rect.height * 2])
        setModelEnd(true)
    }

    const showDetail = (e) => {
        console.log(position)
        if (!detail) {
            setDetail(true)
            setShowCard(false)
            setModelEnd(false)
            setClosing(false)
        }
        else {
            setModelEnd(false)
            setClosing(true)
            let cardTimerId = setInterval(() => {
                setShowCard(true)
                clearInterval(cardTimerId)
            }, 0.5 * DURATION * 1000)
            
            let timerId = setInterval(() => {
                setDetail(false)
                clearInterval(timerId)
            }, DURATION * 1000)
        }
    }

    const card = (
        <Card onClick={showDetail} data={data}/>
    )

    const paper = (
        <Paper data={data} onMount={onPaperMount}/>
    )


    let modalStyle = {
        display: 'inline-block',
        top: position[0],
        left: position[1],
        width: position[2],
        height: position[3],
        transitionDuration: `${DURATION}s`
    }

    if (detail && modalEnd) {
        modalStyle = {
            display: 'inline-block',
            top: modalPosition[0],
            left: modalPosition[1],
            width: modalPosition[2],
            height: modalPosition[3],
            transitionDuration: `${DURATION}s`
        }
    }

    return (
        <>
        <Modal
            style={modalStyle}
            open={detail}
            onClose={showDetail}
            BackdropComponent={Backdrop}
            BackdropProps={{
                closing: closing,
                transitionDuration: DURATION * 1000,
            }}
            disableAutoFocus
        >
            <div style={{outline: 0}}>
            <Fade in={detail}>
                <div>
                    { paper }
                </div>
            </Fade>
            </div>
        </Modal>
        <Fade in={showCard} timeout={{
            enter: 1 * DURATION * 1000,
            exit: 0.3 * DURATION * 1000
        }}>
            <div ref={cardRef}>
                { card }
            </div>
        </Fade>
        </>
    );
}

export default Model;
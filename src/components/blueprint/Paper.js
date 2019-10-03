import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

import CardActions from '@material-ui/core/CardActions';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChildCare from '@material-ui/icons/ChildCare'
import Explore from '@material-ui/icons/Explore'
import Check from '@material-ui/icons/CheckOutlined'
import Redo from '@material-ui/icons/Redo'
import Undo from '@material-ui/icons/Undo'
import DoneIcon from '@material-ui/icons/Done';
import Schedule from '@material-ui/icons/Schedule'
import LocationOn from '@material-ui/icons/LocationOn'


import { red, grey } from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';

import Tooltip from '@material-ui/core/Tooltip';

import Show from '../common/Show'
import TextField from '../input/TextField'

import { parseDate } from '../../utils';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        border: '1px solid #e0e0e0'
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
        height: 20,
        '& span': {
            fontSize: 12,
        }
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    title: {
        fontSize: 25
    },
    descriptionArea: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
        transitionDuration: `3s`
    },
    description: {
        height: 'auto'
    },
    tagArea: {
        paddingTop: 3,
        paddingBottom: 3
    },
    tag: {
        paddingRight: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5)
    },
    actionArea: {
        justifyContent: 'space-between',
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 6,
    },
    action: {
        paddingRight: theme.spacing(2)
    },
    closeButton: {
        paddingBottom: theme.spacing(1)
    },
    iconHover: {
        color: grey[700],
        fontSize: 20,
        '&:hover': {
          color: grey[900],
        },
      },
  }));

const _Paper = (props) => {
    const classes = useStyles()
    const { data, onClose, onMount, onDataChange, style, ...other } = props

    const [history, setHistory] = useState([])
    const [undoHistory, setUndoHistory] = useState([])
    const [newData, setNewData] = useState(data)
    const [newValue, setNewValue] = useState(data)

    const [timerID, setTimerID] = useState(null)
    const [changeTimerID, setChangeTimerID] = useState(null)

    const paperWidth = 600
    const updateTimeout = 500

    useEffect(() => {
        if (newData !== data) {
            if (timerID) {
                clearTimeout(timerID)
            }
            setTimerID(setTimeout(() => {
                handleDataChange(newData)
                setTimerID(null)
            }, updateTimeout))
        }

    }, [newData])

    const ref = useCallback(node => {
        if (node !== null && onMount) {
            onMount(node, paperWidth)
        }
    }, [])

    const handleDataChange = data => {
        if (onDataChange) {
            onDataChange(data)
        }
    }

    const handleClose = e => {
        if (onClose) {
            onClose(e)
        }
    }

    const handleValueChange = e => {
        const {id, value} = e.target

        let _newData = {...newValue}
        _newData[id] = value
        setNewValue({..._newData})
    }

    const handleChange = e => {
        const {id, value} = e.target

        let _newData = {...newData}
        _newData[id] = value

        // setNewValue({..._newData})

        // if (changeTimerID) {
        //     clearTimeout(changeTimerID)
        // }

        // setChangeTimerID(setTimeout(() => {
        //     console.log(newData)
        // }, updateTimeout))

        let _history = [...history]
        let now = new Date()
        let flag = true

        // if (_history.length > 0) {
        //     const [lastTime, oldData] = _history.pop()
        //     if (now - lastTime <= updateTimeout) {
        //         flag = false
        //     }
        //     _history.push([lastTime, oldData])
        // }
        
        if (flag)
            _history.push([now, newData])
        
        setHistory([..._history])
        setNewData({..._newData})
        setUndoHistory([])

        // console.log(id, value)
        // console.log(_history)
    }

    const handleUndo = e => {
        if (history.length > 0) {
            let _history = [...history]
            let _undoHistory = [...undoHistory]
            const oldData = _history.pop()

            let now = new Date()

            _undoHistory.push([now, newData])
    
            setNewValue(oldData[1])
            setNewData(oldData[1])
            setHistory([..._history])
            setUndoHistory([..._undoHistory])
            // console.log(oldData)
        }
    }

    const handleRedo = e => {
        if (undoHistory.length > 0) {
            let _history = [...history]
            let _undoHistory = [...undoHistory]
            const oldData = _undoHistory.pop()
            
            let now = new Date()

            _history.push([now, newData])

            setNewValue(oldData[1])
            setNewData(oldData[1])
            setHistory([..._history])
            setUndoHistory([..._undoHistory])
            // console.log(oldData[1])
        }
    }

    return (
        <>
        <Paper style={style.paper} ref={ref} className={classes.paper} {...other}
        >
            <CardContent className={ classes.content }>
                <Typography className={ classes.titleArea } gutterBottom variant="h5" component="h2">
                    <TextField id={"name"} onTextChange={handleChange} onChange={handleValueChange} className={ classes.title } value={ newValue.name } fullWidth/>
                </Typography>
                <Typography className={ classes.descriptionArea } variant="body2" component="p" color="textSecondary">
                    <TextField id={"description"} onTextChange={handleChange} onChange={handleValueChange} className={ classes.description } value={ newValue.description } fullWidth multiline rows={5} />
                </Typography>
            </CardContent>
            <CardContent className={ classes.tagArea }>
                <Typography>
                    <Grid container>
                        <Show show={ data.status !== "UNSIGNED" }>
                            <Grid item className={classes.tag}>
                                <Chip className={classes.chip} icon={<DoneIcon style={{color: "white"}}/>} style={{backgroundColor: "#81c784", color: "white"}} size="small" label={ `${parseDate(data.date)} 已签到` }></Chip>
                            </Grid>
                        </Show>
                        <Show show={ data.status === "UNSIGNED" }>
                            <Grid item className={classes.tag}>
                                <Chip className={classes.chip} icon={<Schedule style={{color: "white"}}/>} style={{backgroundColor: "#ef5350", color: "white"}} size="small" label={ `${parseDate(data.date)} 未签到` }></Chip>
                            </Grid>
                        </Show>
                        <Grid item className={classes.tag}>
                            <Chip className={classes.chip} icon={
                                <LocationOn/>
                            } size="small" label={ data.place }></Chip>
                        </Grid>
                        <Grid item className={classes.tag}>
                            <Chip className={classes.chip} icon={
                                data.type === '第二课堂' ?
                                <Explore/> :
                                <ChildCare/>
                            } size="small" label={ data.type }></Chip>
                        </Grid>
                        <Grid item className={classes.tag}>
                            <Chip className={classes.chip} avatar={<AccountCircle/>} size="small" label={ data.group }></Chip>
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions className={ classes.actionArea }>
                <Grid container>
                    <Show show={data.status === "UNSIGNED"}>
                        <Grid item className={classes.action}>
                            <Tooltip title="签到" placement="bottom">
                                <Check className={classes.iconHover}/>
                            </Tooltip>
                        </Grid>
                    </Show>
                    <Grid item className={classes.action}>
                        <Tooltip title="更多" placement="bottom">
                            <MoreVertIcon className={classes.iconHover}/>
                        </Tooltip>
                    </Grid>
                    <Grid item className={classes.action}>
                        <Tooltip title="撤销" placement="bottom">
                            <Undo className={classes.iconHover} style={history.length === 0 ? { color: grey[300] } : {}} onClick={handleUndo}/>
                        </Tooltip>
                    </Grid>
                    <Grid item className={classes.action}>
                        <Tooltip title="重做" placement="bottom">
                            <Redo className={classes.iconHover} style={undoHistory.length === 0 ? { color: grey[300] } : {}} onClick={handleRedo}/>
                        </Tooltip>
                    </Grid>
                </Grid>
                    <Grid item className={classes.closeButton}>
                        <Button size="small" onClick={handleClose}>
                            关闭
                        </Button>
                    </Grid>
            </CardActions>
        </Paper>
        </>
    );
}

export default _Paper;
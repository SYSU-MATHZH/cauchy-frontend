import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChildCare from '@material-ui/icons/ChildCare'
import Explore from '@material-ui/icons/Explore'
import Check from '@material-ui/icons/CheckOutlined'
import Beenhere from '@material-ui/icons/Beenhere'
import DoneIcon from '@material-ui/icons/Done';
import Schedule from '@material-ui/icons/Schedule'
import LocationOn from '@material-ui/icons/LocationOn'
import { red, grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

import Show from '../common/Show'

import { parseDate } from '../../utils';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: window.innerWidth - 2 * theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: 265
        },
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
    iconHover: {
        color: grey[700],
        fontSize: 20,
        '&:hover': {
          color: grey[900],
        },
      },
  }));

const _Card = (props) => {
    const classes = useStyles()
    const { data, onClick, onMount } = props

    const [elevation, setElevation] = useState(0)
    const [showActions, setShowActions] = useState(false)

    const cardRef = useCallback(node => {
        if (node !== null && onMount) {
            onMount(node)
        }
    }, [])

    const handleClick = (e) => {
        if (e.target && typeof e.target.className === 'string' && !e.target.className.includes('MuiButton')) {
            if (onClick)
                onClick(e)
        }
    }

    return (
        <>
        <Card ref={cardRef} className={classes.card}
            elevation={elevation}
            onClick={handleClick}
            onMouseOver={e => {
                setElevation(2)
                setShowActions(true)
            }}
            onMouseOut={e => {
                setElevation(0)
                setShowActions(false)
            }}
        >
            <CardContent className={ classes.content }>
                <Typography className={ classes.title } gutterBottom variant="h6" component="h2">
                    { data.name }
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                    { data.description }
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
                    </Grid>
                    <Grid container>
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
                <Show show={showActions}>
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
                    </Grid>
                </Show>
            </CardActions>
        </Card>
        </>
    );
}

export default _Card;
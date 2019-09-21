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
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import { parseDate } from '../../utils';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
      minWidth: 235,
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
    avatar: {
        backgroundColor: red[500],
    },
  }));

const _Card = (props) => {
    const classes = useStyles()
    const { data, onClick, onMount } = props

    const [elevation, setElevation] = useState(0)

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
            onMouseOver={e => {setElevation(2)}}
            onMouseOut={e => {setElevation(0)}}
        >
            <CardHeader
                className={ classes.header }
                avatar={
                    <AccountCircle fontSize="large"/>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Grid container>
                        { data.group }
                    </Grid>
                }
                subheader={
                    <>
                    { parseDate(data.date) }, 岁月湖
                    </>
                }
            />
            <CardContent className={ classes.content }>
                <Typography gutterBottom>
                    <Chip size="small" label={ data.type }></Chip>
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    { data.name }
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                    { data.description }
                </Typography>
            </CardContent>
            <CardActions>
                <div>
                    <Button size="small" color="primary" disabled={ data.status !== 'UNSIGNED' }>
                        { data.status === 'UNSTARTED' ? '未开始' : data.status === 'SIGNED' ? '已签到' : '签到' }
                    </Button>
                </div>
            </CardActions>
        </Card>
        </>
    );
}

export default _Card;
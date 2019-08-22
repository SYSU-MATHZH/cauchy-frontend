import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Back from './common/UserBack';

const backgroundShape = require('../images/shape.svg');

const logo = require('../images/logo.svg');

const numeral = require('numeral');
numeral.defaultFormat('0');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  grid: {
    width: 1200,
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  logo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

const getSteps = () => {
  return [
    'User',
    'Signin',
    'Permission'
  ];
}

const UserActivity = props => {

  const { classes } = props;
  const activities = [
    {
      name: "学术讲座",
      description: "一个学术讲座",
      type: "第二课堂",
      status: "UNSIGNED"
    }, {
      name: "捡垃圾",
      description: "一次捡垃圾活动",
      type: "公益时",
      status: "SIGNED"
    }, {
      name: "志愿者",
      description: "一次志愿服务",
      type: "公益时",
      status: "UNSTARTED"
    }, {
      name: "志愿者",
      description: "一次志愿服务",
      type: "公益时",
      status: "UNSTARTED"
    }, {
      name: "志愿者",
      description: "一次志愿服务",
      type: "公益时",
      status: "UNSTARTED"
    }, {
      name: "志愿者",
      description: "一次志愿服务",
      type: "公益时",
      status: "UNSTARTED"
    }
  ]

  const ActivityCard = activity => (
    <Grid item xs={12} md={4}>
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { activity.name }
          </Typography>
          <Typography gutterBottom>
            <Chip size="small" label={ activity.type } color="secondary"/>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { activity.description }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.alignRight}>
        <Button size="small" color="primary" disabled={ activity.status !== 'UNSIGNED' }>
        { activity.status === 'UNSTARTED' ? '未开始' : activity.status === 'SIGNED' ? '已签到' : '签到' }
        </Button>
        <Button size="small" color="primary">
          查看详情
        </Button>
        </div>
      </CardActions>
    </Card>
    </Grid>
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Back />
        <Grid container justify="center">
          <Grid spacing={4} container className={classes.grid}>
          {/* <Grid item xs={12}>
              <div className={classes.block}>
                <Typography variant="h4" gutterBottom>全部活动</Typography>
              </div>
          </Grid> */}
          <Grid item xs={12}>
              <div className={classes.block}>
                <Typography variant="h6" gutterBottom>未开始或进行中的活动</Typography>
                <Typography variant="body1">
                  对于正在进行的活动，你可以在这里进行签到
                </Typography>
              </div>
          </Grid>
            { activities.map(ActivityCard) }
            <Grid item xs={12}>
              <div className={classes.block}>
                <Typography variant="h6" gutterBottom>已结束的活动</Typography>
                <Typography variant="body1">
                  已结束的或是提交了认定申请的活动会在这里显示
                </Typography>
              </div>
          </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div>
                    <div className={classes.box}>
                      <Typography color='secondary' gutterBottom>
                        认定中的活动
                          </Typography>
                      <Typography variant="body1" gutterBottom>
                        这里的活动正在等待被认定
                          </Typography>
                    </div>
                    <div className={classes.alignRight}>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div>
                    <div className={classes.box}>
                      <Typography color='secondary' gutterBottom>
                        已认定的活动
                          </Typography>
                      <Typography variant="body1" gutterBottom>
                        这是你已经获得认定了的活动
                          </Typography>
                    </div>
                    <div className={classes.alignRight}>
                      <Button color='primary' variant="contained" className={classes.actionButtom}>
                        导出
                          </Button>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}


export default withRouter(withStyles(styles)(UserActivity))

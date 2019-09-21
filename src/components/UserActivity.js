import React, { useState } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Back from './common/UserBack';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Card from './blueprint/Card';
import Model from './blueprint/Model';

import useGlobal from '../store';
import { parseDate } from '../utils';

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
    marginBottom: 40
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
    minWidth: 245,
  },
  media: {
    height: 140,
  },
  date: {
    marginTop: -5,
    marginBottom: 12,
  },
  type: {

  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

const UserActivity = props => {

  const { classes } = props;
  const [global, _] = useGlobal()
  const { user } = global

  const [activityMenu, setActivityMenu] = useState({
    anchorEl: null,
    type: '所有类别'
  })

  // 活动历程菜单
  const openActivityMenu = (event) => {
    setActivityMenu({ ...activityMenu, anchorEl: event.currentTarget });
  }

  const onActivityMenuClick = (type) => type ? () => {
    setActivityMenu({ type, anchorEl: null });
  } : () => {
    setActivityMenu({ ...activityMenu, anchorEl: null });
  }

  const ActivityCard = activity => {
    return (
      <Grid item xs={4}>
        <Model classes={classes} data={activity} Card={Card} Paper={Card}/>
      </Grid>
    )
  }

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
          <>
          <Grid item xs={12}>
              <div className={classes.block}>
                <Typography variant="h6" gutterBottom>进行中的活动</Typography>
                <Typography variant="body1">
                  对于正在进行的活动，你可以在这里进行签到
                </Typography>
              </div>
          </Grid>
          { user.unfinishedActivities.map(ActivityCard) }
          </>
          <>
          <Grid item xs={12}>
              <div className={classes.block}>
                <Typography variant="h6" gutterBottom>即将开始的活动</Typography>
                <Typography variant="body1">
                  这里是你已报名的将要参加活动
                </Typography>
              </div>
          </Grid>
          { user.unstartedActivities.map(ActivityCard) }
          </>
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
                    <div className={classes.topBar} >
                      <div>
                      <Typography color='secondary' gutterBottom>
                        已认定的活动
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        这是你已经获得认定了的活动
                      </Typography>
                      </div>
                      <div>
                        <Button size="small" variant="dropdown" className={classes.outlinedButtom} onClick={openActivityMenu}>
                          {activityMenu.type}
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={activityMenu.anchorEl}
                          keepMounted
                          open={Boolean(activityMenu.anchorEl)}
                          onClose={onActivityMenuClick(null)}
                        >
                          <MenuItem className={classes.menu} onClick={onActivityMenuClick('所有类别')}>所有类别</MenuItem>
                          <MenuItem className={classes.menu} onClick={onActivityMenuClick('公益时')}>公益时</MenuItem>
                          <MenuItem className={classes.menu} onClick={onActivityMenuClick('第二课堂')}>第二课堂</MenuItem>
                        </Menu>
                      </div>
                      </div>
                      <React.Fragment>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>日期</TableCell>
                            <TableCell>活动名称</TableCell>
                            <TableCell>组织单位</TableCell>
                            <TableCell>认定类型</TableCell>
                            <TableCell align="right">分值</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.activities
                            .filter(item => activityMenu.type === '所有类别' || item.type === activityMenu.type)
                            .sort((a, b) => a.date < b.date ? 1 : a.date === b.date ? 0 : -1)
                            .map(row => (
                              <TableRow key={row.id}>
                                <TableCell>{parseDate(row.date)}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.group}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>
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

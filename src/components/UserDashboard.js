import React, { Component, useState, useEffect } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Loading from './common/Loading';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PageContainer from './layout/PageContainer'

import { useGlobal } from '../store';
import { parseDate, parseSchoolYear, isInThisSchoolYear } from '../utils';


const styles = theme => ({
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  twoBlock: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: theme.spacing(2)
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  blockCenterNoSpace: {
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  menu: {
    fontSize: '0.8rem'
  }
});


const UserDashboard = (props) => {

  const [global, actions] = useGlobal()
  const { user, years } = global

  const { activities, pendingActivities, pendingApplications, pendingAppeals } = user

  const [activityMenu, setActivityMenu] = useState({
    anchorEl: null,
    type: '所有类别'
  })

  useEffect(() => {
    console.log("loading")
  }, [])

  // 活动历程菜单
  const openActivityMenu = (event) => {
    setActivityMenu({ ...activityMenu, anchorEl: event.currentTarget });
  }

  const onActivityMenuClick = (type) => type ? () => {
    setActivityMenu({ type, anchorEl: null });
  } : () => {
    setActivityMenu({ ...activityMenu, anchorEl: null });
  }

  // 公益时总览菜单
  const [pgMenu, setPgMenu] = useState({
    anchorEl: null,
    type: parseSchoolYear(years[0])
  })

  const openPgMenu = (event) => {
    setPgMenu({ ...pgMenu, anchorEl: event.currentTarget });
  }

  const onPgMenuClick = (type) => type ? () => {
    setPgMenu({ type, anchorEl: null });
  } : () => {
    setPgMenu({ ...pgMenu, anchorEl: null });
  }

  // 第二课堂学分总览菜单
  const [spMenu, setSpMenu] = useState({
    anchorEl: null,
    type: parseSchoolYear(years[0])
  })

  const openSpMenu = (event) => {
    setSpMenu({ ...spMenu, anchorEl: event.currentTarget });
  }

  const onSpMenuClick = (type) => type ? () => {
    setSpMenu({ type, anchorEl: null });
  } : () => {
    setSpMenu({ ...spMenu, anchorEl: null });
  }

  const { classes } = props;
  const currentPath = props.location.pathname

  return (
    <React.Fragment>
      <PageContainer>
            <Grid item xs={12}>
              <div className={classes.topBar}>
                <div className={classes.block}>
                  <Typography variant="h6" gutterBottom>我的活动</Typography>
                  <Typography variant="body1">
                    你可以在这里管理你参与的所有活动
                </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <div className={classes.box}>
                  <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                    未认定的活动
                    </Typography>
                  <Typography variant="body2" gutterBottom>
                    所有已报名或参与但未认定活动
                    </Typography>
                  <div className={classes.blockCenter}>
                    <Typography color='secondary' variant="h6" gutterBottom>
                      {pendingActivities.length} 个活动
                    </Typography>
                  </div>
                </div>
                <div className={classes.buttonBar}>
                  <Button to={{ pathname: "/user-activity" }} component={Link} variant="outlined" className={classes.actionButtom}>
                    查看详情
                  </Button>
                  <Button to={{ pathname: "/dashboard", search: `?type=apply` }} component={Link} color='primary' variant="contained" className={classes.actionButtom}>
                    参加新的活动
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <div className={classes.box}>
                  <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                    审核中的认定申请
                    </Typography>
                  <Typography variant="body2" gutterBottom>
                    所有审核中的活动分值认定申请
                    </Typography>
                  <div className={classes.blockCenter}>
                    <Typography color='secondary' variant="h6" gutterBottom>
                      {pendingApplications.length} 个申请
                    </Typography>
                  </div>
                </div>
                <div className={classes.buttonBar}>
                  <Button to={{ pathname: "/user-activity", search: `?type=save` }} component={Link} variant="outlined" className={classes.actionButtom}>
                    查看详情
                  </Button>
                  <Button to={{ pathname: "/dashboard", search: `?type=apply` }} component={Link} color='primary' variant="contained" className={classes.actionButtom}>
                    创建申请
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <div className={classes.box}>
                  <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                    处理中的申诉
                    </Typography>
                  <Typography variant="body2" gutterBottom>
                    所有处理中的申诉
                    </Typography>
                  <div className={classes.blockCenter}>
                    <Typography color='secondary' variant="h6" gutterBottom>
                      {pendingAppeals.length} 个申诉
                    </Typography>
                  </div>
                </div>
                <div className={classes.buttonBar}>
                  <Button to={{ pathname: "/dashboard", search: `?type=save` }} component={Link} variant="outlined" className={classes.actionButtom}>
                    查看详情
                  </Button>
                  <Button to={{ pathname: "/dashboard", search: `?type=apply` }} component={Link} color='primary' variant="contained" className={classes.actionButtom}>
                    创建申诉
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} md={8} >
                <Paper className={classes.paper} style={{ position: 'relative' }}>
                  <Loading loading={false} />
                  <div className={''}>
                    <div className={classes.topBar} >
                      <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                        近期活动历程
                  </Typography>
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
                    <Typography variant="body1">
                      我近期参与过的活动
                  </Typography>
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
                          {activities
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
                      <div className={classes.seeMore}>
                        <Link color="primary" to={{ pathname: "/user-activity", search: `?type=activities` }}>
                          查看所有活动
                      </Link>
                      </div>
                    </React.Fragment>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{ position: 'relative' }}>
                  <Loading loading={false} />
                  <div className={''}>
                    <div className={classes.topBar}>
                      <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                        我的学分总览
                </Typography>
                      <div>
                        <Button size="small" variant="dropdown" className={classes.outlinedButtom} onClick={openSpMenu}>
                          {typeof spMenu.type !== "object" ? spMenu.type : parseSchoolYear(spMenu.type)}
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={spMenu.anchorEl}
                          keepMounted
                          open={Boolean(spMenu.anchorEl)}
                          onClose={onSpMenuClick(null)}
                        >{years.map(year => <MenuItem
                          className={classes.menu}
                          onClick={onSpMenuClick(year)}
                        >
                          {parseSchoolYear(year)}
                        </MenuItem>)}
                          <MenuItem className={classes.menu} onClick={onSpMenuClick('全部')}>全部</MenuItem>
                        </Menu>
                      </div>
                    </div>
                    <Typography variant="body1">
                      第二课堂学分统计
                  </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {activities.filter(x => x.type === '第二课堂').filter(x => spMenu.type === '全部' || isInThisSchoolYear(spMenu.type)(x)).reduce((total, x) => total + x.amount, 0)} 学分
                  </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button color='primary' variant="contained" className={classes.actionButtom}>
                        查看详情
                    </Button>
                    </div>
                  </div>
                </Paper>
                <Paper className={classes.paper} style={{ position: 'relative' }}>
                  <Loading loading={false} />
                  <div className={''}>
                    <div className={classes.topBar}>
                      <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                        我的公益时总览
                </Typography>
                      <div>
                        <Button size="small" variant="dropdown" className={classes.outlinedButtom} onClick={openPgMenu}>
                          {typeof pgMenu.type !== "object" ? pgMenu.type : parseSchoolYear(pgMenu.type)}
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={pgMenu.anchorEl}
                          keepMounted
                          open={Boolean(pgMenu.anchorEl)}
                          onClose={onPgMenuClick(null)}
                        >{years.map(year => <MenuItem
                          className={classes.menu}
                          onClick={onPgMenuClick(year)}
                        >
                          {parseSchoolYear(year)}
                        </MenuItem>)}
                          <MenuItem className={classes.menu} onClick={onPgMenuClick('全部')}>全部</MenuItem>
                        </Menu>
                      </div>
                    </div>
                    <Typography variant="body1">
                      公益时数统计
                  </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {activities.filter(x => x.type === '公益时').filter(x => spMenu.type === '全部' || isInThisSchoolYear(pgMenu.type)(x)).reduce((total, x) => total + x.amount, 0)} 小时
                  </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button color='primary' variant="contained" className={classes.actionButtom}>
                        查看详情
                    </Button>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
      </PageContainer>
    </React.Fragment>
  );

}

export default withRouter(withStyles(styles)(UserDashboard));

import React, { Component, useState, useEffect } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from './blueprint/Card';
import Paper from './blueprint/Paper'
import Model from './blueprint/Model';

import PageContainer from './layout/PageContainer'
import { useGlobal } from '../store';


const styles = theme => ({
    block: {
        padding: theme.spacing(2),
    },
});


const UserActivities = (props) => {

  const { classes } = props;
  const [global, globalActions] = useGlobal()
  const { user } = global

  const handleUnfinishedActivityChange = id => data => {
        globalActions.user.updateUFA(id, data)
  }

  const ActivityCard = (activity, id) => {
    return (
      <Grid item>
        <Model classes={classes} data={activity} onDataChange={handleUnfinishedActivityChange(id)} Card={Card} Paper={Paper}/>
      </Grid>
    )
  }

  return (
    <>
      <PageContainer>
        <Grid spacing={4} container className={classes.block}>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>进行中的活动</Typography>
                <Typography variant="body1">
                    对于正在进行的活动，你可以在这里进行签到
                </Typography>
            </Grid>
            { user.unfinishedActivities.map(ActivityCard) }
        </Grid>
      </PageContainer>
    </>
  );

}

export default withRouter(withStyles(styles)(UserActivities));

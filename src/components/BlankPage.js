import React, { Component, useState, useEffect } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PageContainer from './layout/PageContainer'


const styles = theme => ({
    block: {
        padding: theme.spacing(2),
    },
});


const BlankPage = (props) => {

  const { classes } = props;

  return (
    <>
      <PageContainer>
        <Grid item xs={12}>
            <div className={classes.block}>
              <Typography variant="h6" gutterBottom>空白页</Typography>
              <Typography style={{height: 800}} variant="body1">
                这是一个空白页
              </Typography>
            </div>
        </Grid>
      </PageContainer>
    </>
  );

}

export default withRouter(withStyles(styles)(BlankPage));

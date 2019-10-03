import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import Activities from './components/UserDashboard'
import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Main from './components/Main'
import Signup from './components/Signup'
import SignIn from './components/SignIn'
import ScrollToTop from './components/ScrollTop'

import { useGlobal } from './store'
import UserActivities from './components/UserActivities';
import UserActivity from './components/UserActivity';
import BlankPage from './components/BlankPage'

const PrivateRoute = ({ match, component: Component, ...rest }) => {
  const [globalState, globalActions] = useGlobal();
  const { user } = globalState;
  return (
      <Route
          { ...rest }
          render={ props => user.status === 'AUTHED' ? (
              <Component { ...props } />
          ) : (
              <Redirect
                  to={{
                      pathname: '/signin',
                      state: { from: props.location }
                  }}
              />
          )}
      />
  );
};

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <PrivateRoute exact path='/' component={ Main } />
          <Route exact path='/signin' component={ SignIn }/>
          <PrivateRoute exact path='/user-dashboard' component={ UserActivities } />
          <PrivateRoute exact path='/user-application' component={ BlankPage } />
          <PrivateRoute exact path='/user-appeal' component={ BlankPage } />
          <PrivateRoute exact path='/dashboard' component={ BlankPage } />
          <PrivateRoute exact path='/app' component={ BlankPage } />
          <PrivateRoute exact path='/student' component={ BlankPage } />
          <PrivateRoute exact path='/user-activity' component={ UserActivity } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <PrivateRoute exact path='/cards' component={ Cards } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )
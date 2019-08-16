import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import Activities from './components/Activities'
import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Main from './components/Main'
import Signup from './components/Signup'
import SignIn from './components/SignIn'
import ScrollToTop from './components/ScrollTop'

import useGlobal from './store'

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
          <PrivateRoute exact path='/activities' component={ Activities } />
          <PrivateRoute exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )
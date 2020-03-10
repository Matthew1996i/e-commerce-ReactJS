import React from 'react'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
// import NotFound from '../components/templates/NotFound'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from './history'

const PrivateRoute = props => {
  const isLogged = !!sessionStorage.getItem('@user-token')

  return isLogged ? <Route {...props}/> : <Redirect to='/' />
}
    
export default function Routes(){
  
  return (
    <Router history={history}>
      <Switch >
        <Route exact path='/' component={Login}/>
        <PrivateRoute path='/home' component={Home}/>
        <Redirect from='*' to='/home' />
      </Switch>
    </Router>
  )
}

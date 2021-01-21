import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isLogin = localStorage.getItem('session') ? true : false

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (isLogin ? <Component {...props} /> : <Redirect to="/login" />)} />
}

export { PrivateRoute }

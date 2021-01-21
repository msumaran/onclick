import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const isLogin = localStorage.getItem('session') ? true : false

const propTypes = {
  restricted: PropTypes.bool
}

const defaultProps = {
  restricted: false
}

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (isLogin && restricted ? <Redirect to="/dashboard" /> : <Component {...props} />)}
    />
  )
}

PublicRoute.propTypes = propTypes
PublicRoute.defaultProps = defaultProps

export { PublicRoute }

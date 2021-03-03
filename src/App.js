import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from 'components/CustomRoute'
import store from 'redux/store'
import history from 'helpers/history'

import Preloader from '../src/components/Preloader/Preloader'

//
import '@coreui/icons/css/all.css'
import 'assets/scss/style.scss'
//
const loading = () => <Preloader />
//
const Login = React.lazy(() => import('views/Pages/Login/Login'))
const Layout = React.lazy(() => import('containers/Layout'))

const App = () => {
  return (
    <Provider store={store}>
      <React.Suspense fallback={loading()}>
        <Router history={history} basename={process.env.PUBLIC_URL} >
          <Switch>
            <PublicRoute restricted path="/login" name="Login" component={Login} exact />
            <PrivateRoute path="/" name="Admin" component={Layout} />
          </Switch>
        </Router>
      </React.Suspense>
    </Provider>
  )
}

export default App

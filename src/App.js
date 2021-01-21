import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from 'components/CustomRoute'
import store from 'redux/store'
import history from 'helpers/history'
//
import '@coreui/icons/css/all.css'
import 'assets/scss/style.scss'
//
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>
//
const Login = React.lazy(() => import('views/Pages/Login/Login'))
const Layout = React.lazy(() => import('containers/Layout'))

const App = () => {
  return (
    <Provider store={store}>
      <React.Suspense fallback={loading()}>
        <Router history={history}>
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

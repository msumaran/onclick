import React, { Suspense, lazy, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as router from 'react-router-dom'
import { Container } from 'reactstrap'
import { ToastContainer } from 'react-toastify'
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarHeader,
  AppSidebarForm,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarFooter,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb
} from '@coreui/react'

import { confirm } from 'components/CustomModal/ModalConfirm'

import accountAction from 'redux/actions/accountAction'

// sidebar nav config
import { Navigation } from 'helpers/nav'
// routes config
import routes from 'helpers/routes'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

const Header = lazy(() => import('./Header'))
const Footer = lazy(() => import('./Footer'))
const ChangePassword = lazy(() => import('../../views/Security/ChangePassword'))

const Layout = (props) => {

  const dataUser = JSON.parse(localStorage.getItem('session'))

  const dispatch = useDispatch()

  const signOut = useCallback(
    (e) => {
      e.preventDefault()

      confirm('Logout', 'Are you sure you want to logout?', 'Yes', 'Not', {
        enableEscape: false,
        proceed: () => {
          dispatch(accountAction.logout())
        }
      })
    },
    [dispatch]
  )

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <Header onLogout={(e) => signOut(e)} user={ dataUser } />
        </Suspense>
      </AppHeader>

      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense fallback={loading()}>

            <AppSidebarNav navConfig={ Navigation() } {...props} router={router} />
            
            {/* <AppSidebarNav navConfig={navigation} {...props} router={router} /> */}
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null
                })}
                <Route
                  path="/security/change-password"
                  exact
                  name="Change Password"
                  render={(props) => <ChangePassword {...props} />}
                />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
      
      <AppFooter>
        <Suspense fallback={loading()}>
          <Footer />
        </Suspense>
      </AppFooter>
      <ToastContainer />
    </div>
  )
}

export default Layout
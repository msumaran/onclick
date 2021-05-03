import React, { Suspense, lazy, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as router from 'react-router-dom'
import { Container } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
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
import FeedbackActions from 'redux/feedback.redux'

// sidebar nav config
import { Navigation } from 'helpers/nav'
// routes config
import routes from 'helpers/routes'

import Preloader from '../../components/Preloader/Preloader'
import Feedback from 'components/Feedback/Feedback'

import { toastDefaults } from 'helpers/config'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading content...</div>

const Header = lazy(() => import('./Header'))
const Footer = lazy(() => import('./Footer'))
const ChangePassword = lazy(() => import('../../views/Security/ChangePassword'))

const Layout = (props) => {

  const dispatch = useDispatch()

  const dataUser = JSON.parse(localStorage.getItem('session'))

  const permissionsLoaded = useSelector((state) => state.accountReducer.loaded)
  const my_permissions = useSelector((state) => state.accountReducer.permissions)

  const feedback_create_status = useSelector(state => state.FeedbackReducer.create_status)

  useEffect(() => {

    if (!permissionsLoaded) {

      dispatch(accountAction.getPermissions())
    }
  }, [ permissionsLoaded, dispatch ])

  const signOut = useCallback(
    (e) => {
      e.preventDefault()

      confirm('Cerrar Sesión', '¿Estás seguro que deseas cerrar tu sesión?', 'Cerrar sesión', 'Cancelar', {
        enableEscape: false,
        proceed: () => {
          dispatch(accountAction.logout())
        }
      })
    },
    [dispatch]
  )

  const createRow = async (data) => {

    await dispatch(FeedbackActions.createRow(data))

    toast.success('El mensaje se envió con éxito.', toastDefaults)
  }

  return (
    <div className="app">
      {!permissionsLoaded ? (
        <Preloader />
      ) : (
        <>
          <AppHeader fixed>
            <Suspense fallback={loading()}>
              <Header onLogout={(e) => signOut(e)} user={ dataUser } />
            </Suspense>
          </AppHeader>

          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <div className="space-top d-none d-md-block"></div>
              <Suspense fallback={loading()}>

                <AppSidebarNav navConfig={ Navigation(my_permissions) } {...props} router={router} />

                {/* <AppSidebarNav navConfig={navigation} {...props} router={router} /> */}
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb className="main-breadcrumb d-block d-lg-none" appRoutes={routes} router={router} />
              <Container fluid className="main-container">
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
          <Footer>
            <Feedback
              sending={feedback_create_status === 'creating'}
              dispatch={async (data) => await createRow(data)}
            />
          </Footer>

          <ToastContainer />
        </>
      )}
    </div>
  )
}

export default Layout

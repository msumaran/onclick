import React from 'react'

const Dashboard = React.lazy(() => import('views/Dashboard/Dashboard'))

const MyContacts = React.lazy(() => import('views/Clients/MyContacts/MyContacts'))
const MyPayments = React.lazy(() => import('views/Clients/MyPayments/MyPayments'))
const MyLanding = React.lazy(() => import('views/Clients/MyLanding/MyLanding'))

const User = React.lazy(() => import('views/Security/User/User'))
const Profile = React.lazy(() => import('views/Security/Profile/Profile'))

const Access = React.lazy(() => import('views/Security/Profile/Access'))
// const Inscription = React.lazy(() => import('views/Inscription/Inscription'))
// const Subscription = React.lazy(() => import('views/Subscription/Subscription'))
// const Report = React.lazy(() => import('views/Report/Report'))

const Client = React.lazy(() => import('views/Client/Client'))
const Payment = React.lazy(() => import('views/Payment/Payment'))
const MyPayment = React.lazy(() => import('views/Client/Payment/MyPayment'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Tablero', component: Dashboard },
  { path: '/my-contacts', name: 'Mis contactos', component: MyContacts },
  { path: '/my-payments', name: 'Mis pagos', component: MyPayments },
  { path: '/my-landing', name: 'Mis pagos', component: MyLanding },

  { path: '/security/access', name: 'Accesos', component: Access },
  { path: '/security/users', name: 'Usuarios', component: User },
  { path: '/security/profiles', name: 'Perfiles', component: Profile },

  { path: '/client', name: 'Clientes', component: Client },
  { path: '/payment', name: 'Pagos', component: Payment },
  { path: '/my-payments', name: 'Mis pagos', component: MyPayment },
]

export default routes

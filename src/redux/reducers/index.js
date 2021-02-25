import { combineReducers } from 'redux'
// Reducers
import accountReducer from 'redux/reducers/accountReducer'
import userReducer from 'redux/reducers/userReducer'

import accessReducer from 'redux/reducers/accessReducer'
import profileReducer from 'redux/reducers/profileReducer'
import permissionReducer from 'redux/reducers/permissionReducer'
import dashboardReducer from 'redux/reducers/dashboardReducer'

import clientReducer from 'redux/reducers/clientReducer'
import paymentReducer from 'redux/reducers/paymentReducer'
import packReducer from 'redux/reducers/packReducer'

import landingReducer from 'redux/reducers/landingReducer'
import myPaymentsReducer from 'redux/reducers/myPaymentsReducer'

const reducers = combineReducers({
  accountReducer,
  userReducer,
  accessReducer,
  profileReducer,
  permissionReducer,
  dashboardReducer,
  clientReducer,
  paymentReducer,
  packReducer,

  landingReducer,
  myPaymentsReducer,
})

export default reducers

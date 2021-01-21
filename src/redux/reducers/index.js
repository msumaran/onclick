import { combineReducers } from 'redux'
// Reducers
import accountReducer from 'redux/reducers/accountReducer'
import userReducer from 'redux/reducers/userReducer'

import subscriptionReducer from 'redux/reducers/subscriptionReducer'
import accessReducer from 'redux/reducers/accessReducer'
import profileReducer from 'redux/reducers/profileReducer'
import evaluationReducer from 'redux/reducers/evaluationReducer'
import ubigeoReducer from 'redux/reducers/ubigeoReducer'
import permissionReducer from 'redux/reducers/permissionReducer'
import reportReducer from 'redux/reducers/reportReducer'
import dashboardReducer from 'redux/reducers/dashboardReducer'

const reducers = combineReducers({
  accountReducer,
  userReducer,
  subscriptionReducer,
  accessReducer,
  profileReducer,
  evaluationReducer,
  ubigeoReducer,
  permissionReducer,
  reportReducer,
  dashboardReducer
})

export default reducers

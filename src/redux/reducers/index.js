import { combineReducers } from 'redux'
// Reducers
import accountReducer from 'redux/reducers/accountReducer'
import userReducer from 'redux/reducers/userReducer'

import accessReducer from 'redux/reducers/accessReducer'
import profileReducer from 'redux/reducers/profileReducer' 
import permissionReducer from 'redux/reducers/permissionReducer' 
import dashboardReducer from 'redux/reducers/dashboardReducer'
import landingReducer from 'redux/reducers/landingReducer'

const reducers = combineReducers({
  accountReducer,
  userReducer, 
  accessReducer,
  profileReducer,  
  permissionReducer, 
  dashboardReducer
  landingReducer,
})

export default reducers

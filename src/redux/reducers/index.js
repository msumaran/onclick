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

import clientLandingReducer from 'redux/reducers/clientLandingReducer'
import landingReducer from 'redux/reducers/landingReducer'
import myPaymentsReducer from 'redux/reducers/myPaymentsReducer'
import myContactsReducer from 'redux/reducers/myContactsReducer'
import reportReducer from 'redux/reducers/reportReducer'

import { ActivationsReducer } from 'redux/activations.redux'
import { InquiriesReducer } from 'redux/inquiries.redux'
import { FeedbackReducer } from 'redux/feedback.redux'
import { LandingsReducer } from 'redux/landings.redux'

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

  clientLandingReducer,
  landingReducer,
  myPaymentsReducer,
  myContactsReducer,
  reportReducer,

  ActivationsReducer,
  InquiriesReducer,
  FeedbackReducer,
  LandingsReducer,
})

export default reducers

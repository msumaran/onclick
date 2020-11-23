import { combineReducers } from 'redux';
import paylogs from './paylogs.reducer'; 

import user from '../../../contacts/store/reducers/user.reducer';

const reducer = combineReducers({
	paylogs,
	user
});

export default reducer;

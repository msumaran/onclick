import { combineReducers } from 'redux';
import clients from './clients.reducer'; 

import user from '../../../contacts/store/reducers/user.reducer';

const reducer = combineReducers({
	clients,
	user
});

export default reducer;

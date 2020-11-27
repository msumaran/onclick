import { combineReducers } from 'redux';
import payments from './payments.reducer';

import user from '../../../contacts/store/reducers/user.reducer';

const reducer = combineReducers({
	payments,
	user
});

export default reducer;

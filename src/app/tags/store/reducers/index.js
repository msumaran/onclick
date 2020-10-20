import { combineReducers } from 'redux';
import tags from './tags.reducer';
import user from './user.reducer';

const reducer = combineReducers({
	tags,
	user
});

export default reducer;

import * as Actions from '../actions';

const initialState = {
	dialogOpen: false,
	data: null,
	list: null
};

const cardReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.OPEN_CARD_DIALOG: {
			
			console.log(action.payload);
			return {
				dialogOpen: true,
				data: action.payload.card,
				list: action.payload.list
			};
		}
		case Actions.UPDATE_CARD: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.REMOVE_CARD: {
			return initialState;
		}
		case Actions.CLOSE_CARD_DIALOG: {
			return initialState;
		}
		default:
			return state;
	}
};

export default cardReducer;

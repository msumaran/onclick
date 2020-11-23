import * as Actions from '../actions';

const initialState = {
	entities: null,
	searchText: '',
	selectedPaylogIds: [],
	routeParams: {},
	// paylogDialog: {
	// 	type: 'new',
	// 	props: {
	// 		open: false
	// 	},
	// 	data: null
	// }
};

const paylogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PAYLOGS: {
			return {
				...state,
				//entities: _.keyBy(action.payload, 'id'),
				entities: action.payload,
				routeParams: action.routeParams
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.TOGGLE_IN_SELECTED_PAYLOGS: {
			const { paylogId } = action;

			let selectedPaylogIds = [...state.selectedPaylogIds];

			if (selectedPaylogIds.find(id => id === paylogId) !== undefined) {
				selectedPaylogIds = selectedPaylogIds.filter(id => id !== paylogId);
			} else {
				selectedPaylogIds = [...selectedPaylogIds, paylogId];
			}

			return {
				...state,
				selectedPaylogIds
			};
		}
		case Actions.SELECT_ALL_PAYLOGS: {
			const arr = Object.keys(state.entities).map(k => state.entities[k]);

			const selectedPaylogIds = arr.map(paylog => paylog.id);

			return {
				...state,
				selectedPaylogIds
			};
		}
		// case Actions.DESELECT_ALL_PAYLOGS: {
		// 	return {
		// 		...state,
		// 		selectedPaylogIds: []
		// 	};
		// }
		// case Actions.OPEN_NEW_PAYLOG_DIALOG: {
		// 	return {
		// 		...state,
		// 		paylogDialog: {
		// 			type: 'new',
		// 			props: {
		// 				open: true
		// 			},
		// 			data: null
		// 		}
		// 	};
		// }
		case Actions.CLOSE_NEW_PAYLOG_DIALOG: {
			return {
				...state,
				paylogDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_EDIT_PAYLOG_DIALOG: {
			return {
				...state,
				paylogDialog: {
					type: 'edit',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_EDIT_PAYLOG_DIALOG: {
			return {
				...state,
				paylogDialog: {
					type: 'edit',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		default: {
			return state;
		}
	}
};

export default paylogsReducer;

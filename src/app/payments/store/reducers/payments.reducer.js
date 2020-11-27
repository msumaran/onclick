import * as Actions from '../actions';

const initialState = {
	entities: null,
	searchText: '',
	selectedPaymentIds: [],
	routeParams: {},
	paymentDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};

const paymentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PAYMENTS: {
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
		case Actions.TOGGLE_IN_SELECTED_PAYMENTS: {
			const { paymentId } = action;

			let selectedPaymentIds = [...state.selectedPaymentIds];

			if (selectedPaymentIds.find(id => id === paymentId) !== undefined) {
				selectedPaymentIds = selectedPaymentIds.filter(id => id !== paymentId);
			} else {
				selectedPaymentIds = [...selectedPaymentIds, paymentId];
			}

			return {
				...state,
				selectedPaymentIds
			};
		}
		case Actions.SELECT_ALL_PAYMENTS: {
			const arr = Object.keys(state.entities).map(k => state.entities[k]);

			const selectedPaymentIds = arr.map(payment => payment.id);

			return {
				...state,
				selectedPaymentIds
			};
		}
		case Actions.DESELECT_ALL_PAYMENTS: {
			return {
				...state,
				selectedPaymentIds: []
			};
		}
		case Actions.OPEN_NEW_PAYMENT_DIALOG: {
			return {
				...state,
				paymentDialog: {
					type: 'new',
					props: {
						open: true
					},
					data: null
				}
			};
		}
		case Actions.CLOSE_NEW_PAYMENT_DIALOG: {
			return {
				...state,
				paymentDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_EDIT_PAYMENT_DIALOG: {
			return {
				...state,
				paymentDialog: {
					type: 'edit',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_EDIT_PAYMENT_DIALOG: {
			return {
				...state,
				paymentDialog: {
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

export default paymentsReducer;

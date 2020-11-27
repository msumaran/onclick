import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';

import moment from 'moment'

export const GET_PAYMENTS = '[PAYMENTS APP] GET PAYMENTS';
export const SET_SEARCH_TEXT = '[PAYMENTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PAYMENTS = '[PAYMENTS APP] TOGGLE IN SELECTED PAYMENTS';
export const SELECT_ALL_PAYMENTS = '[PAYMENTS APP] SELECT ALL PAYMENTS';
export const DESELECT_ALL_PAYMENTS = '[PAYMENTS APP] DESELECT ALL PAYMENTS';
export const OPEN_NEW_PAYMENT_DIALOG = '[PAYMENTS APP] OPEN NEW PAYMENT DIALOG';
export const CLOSE_NEW_PAYMENT_DIALOG = '[PAYMENTS APP] CLOSE NEW PAYMENT DIALOG';
export const OPEN_EDIT_PAYMENT_DIALOG = '[PAYMENTS APP] OPEN EDIT PAYMENT DIALOG';
export const CLOSE_EDIT_PAYMENT_DIALOG = '[PAYMENTS APP] CLOSE EDIT PAYMENT DIALOG';
export const ADD_PAYMENT = '[PAYMENTS APP] ADD PAYMENT';
export const UPDATE_PAYMENT = '[PAYMENTS APP] UPDATE PAYMENT';
export const REMOVE_PAYMENT = '[PAYMENTS APP] REMOVE PAYMENT';
export const REMOVE_PAYMENTS = '[PAYMENTS APP] REMOVE PAYMENTS';
export const TOGGLE_STARRED_PAYMENT = '[PAYMENTS APP] TOGGLE STARRED PAYMENT';
export const TOGGLE_STARRED_PAYMENTS = '[PAYMENTS APP] TOGGLE STARRED PAYMENTS';
export const SET_PAYMENTS_STARRED = '[PAYMENTS APP] SET PAYMENTS STARRED ';


export function getPayments(routeParams, userUID) {
    return (dispatch, getState) => {

        let ref = firebaseService.db.ref(`users/${userUID}/payments`);

        switch (routeParams.id) {
            case 'starred':
                ref = ref.orderByChild("starred").equalTo(true)
                break;
            default:
        }
        ref
            .once('value')
            .then(snapshot => {
                let payments = snapshot.val();
                // console.log("payments ", payments)
                if (payments !== null) {
                    _.forEach(payments, function(value, key) {
                        if (value) value.id = key;
                    });
                } else {
                    payments = [];
                }
                return dispatch({
                    type: GET_PAYMENTS,
                    payload: payments,
                    routeParams
                })

            });
    }
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedPayments(paymentId) {
    return {
        type: TOGGLE_IN_SELECTED_PAYMENTS,
        paymentId
    };
}

export function selectAllPayments() {
    return {
        type: SELECT_ALL_PAYMENTS
    };
}

export function deSelectAllPayments() {
    return {
        type: DESELECT_ALL_PAYMENTS
    };
}

export function openNewPaymentDialog() {
    return {
        type: OPEN_NEW_PAYMENT_DIALOG
    };
}

export function closeNewPaymentDialog() {
    return {
        type: CLOSE_NEW_PAYMENT_DIALOG
    };
}

export function openEditPaymentDialog(data) {
    return {
        type: OPEN_EDIT_PAYMENT_DIALOG,
        data
    };
}

export function closeEditPaymentDialog() {
    return {
        type: CLOSE_EDIT_PAYMENT_DIALOG
    };
}

export function makePaymentLog(snapshot, payment, dataUser) {
    return (dispatch, getState) => {

        const { routeParams } = getState().paymentsApp.payments;

        const dataLog = {
            displayName: dataUser.displayName,
            endAt: payment.endAt,
            lastName: dataUser.lastName,
            payId: snapshot.key,
            price: payment.packPrice,
            startAt: payment.startAt,
            userId: dataUser.id
        }

        firebaseService.db.ref(`payments`)
            .push(dataLog)
            .then(snapshot => {
                Promise.all([
                    dispatch({
                        type: ADD_PAYMENT
                    })

                ]).then(() => {
                    dispatch(getPayments(routeParams, dataUser.id))
                });
            });

    }
}

export function addPayment(newPayment, dataUser) {
    return (dispatch, getState) => {

        let price = ""
        let packName = ""
        let addYears = ""

        if( newPayment.pack == "pack-1" ){ addYears = 1; packName = "Pack Tiny"; price = "19.90" }
        if( newPayment.pack == "pack-2" ){ addYears = 2; packName = "Pack Regular"; price = "29.90" }
        if( newPayment.pack == "pack-3" ){ addYears = 3; packName = "Pack Full"; price = "39.90" }

        let payment = {
            pack: packName,
            packPrice: price,
            createdAt: Date.now() / 1000,
            startAt: Date.now() / 1000,
            endAt: moment(Date.now()).add(addYears,'y') / 1000,
        }

        const { routeParams } = getState().paymentsApp.payments;

        firebaseService.db.ref(`users/${dataUser.id}/payments`)
            .push(payment)
            .then(snapshot => {
                Promise.all([

                    dispatch({
                        type: ADD_PAYMENT
                    })

                ]).then(() => {
                    dispatch(makePaymentLog(snapshot, payment, dataUser))
                    // dispatch(getPayments(routeParams, dataUser.id))
                });
            });
    };
}

export function updatePayment(payment, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;
     
        console.log("payment ", payment)
        firebaseService.db.ref(`users/${userUID}/payments`).child(payment.id).update(payment).then(() => {
            Promise.all([
                dispatch({
                    type: ADD_PAYMENT
                })
            ]).then(() => dispatch(getPayments(routeParams, userUID)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removePayment(paymentId, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;
        const id = paymentId;
        firebaseService.db.ref(`users/${userUID}/payments/${id}`).remove().then(() => {
            Promise.all([
                dispatch({
                    type: REMOVE_PAYMENT
                })
            ]).then(() => dispatch(getPayments(routeParams, userUID)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removePayments(paymentIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;

        let promises = [];
        paymentIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users/${userUID}/payments/${element}`).remove());
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: REMOVE_PAYMENTS
                })
            ]).then(() => dispatch(getPayments(routeParams, userUID)));
        });
    };
}

export function toggleStarredPayment(paymentId, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;


        firebaseService.db.ref(`users/${userUID}/payments`).child(paymentId).once("value", function(snapshot) {
            let payment = snapshot.val();
            if (payment.starred === undefined || payment.starred === false) {
                payment.starred = true;
            } else {
                payment.starred = false;
            }
            firebaseService.db.ref(`users/${userUID}/payments`).child(paymentId).update(payment).then(() => {
                Promise.all([
                    dispatch({
                        type: TOGGLE_STARRED_PAYMENT
                    })
                ]).then(() => dispatch(getPayments(routeParams, userUID)))
            });
        });
    };
}

export function toggleStarredPayments(paymentIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;

        let promises = [];
        paymentIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users/${userUID}/payments`).child(element).update({ starred: true }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_PAYMENTS
                }),
                dispatch({
                    type: DESELECT_ALL_PAYMENTS
                }),
            ]).then(() => dispatch(getPayments(routeParams, userUID)));
        });

        // const request = axios.post('/api/payments-app/toggle-starred-payments', {
        //     paymentIds
        // });

        // return request.then(response =>
        //     Promise.all([
        //         dispatch({
        //             type: TOGGLE_STARRED_PAYMENTS
        //         }),
        //         dispatch({
        //             type: DESELECT_ALL_PAYMENTS
        //         }),
        //         dispatch(getUserData())
        //     ]).then(() => dispatch(getPayments(routeParams, userUID)))
        // );
    };
}

export function setPaymentsStarred(paymentIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;

        let promises = [];
        paymentIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users/${userUID}/payments`).child(element).update({ starred: true }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_PAYMENTS
                }),
                dispatch({
                    type: DESELECT_ALL_PAYMENTS
                }),
            ]).then(() => dispatch(getPayments(routeParams, userUID)));
        });
    };
}

export function setPaymentsUnstarred(paymentIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paymentsApp.payments;

        let promises = [];
        paymentIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users/${userUID}/payments`).child(element).update({ starred: false }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_PAYMENTS
                }),
                dispatch({
                    type: DESELECT_ALL_PAYMENTS
                }),
            ]).then(() => dispatch(getPayments(routeParams, userUID)));
        });
    };
}
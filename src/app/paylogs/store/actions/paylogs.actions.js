import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';

export const GET_PAYLOGS = '[PAYLOGS APP] GET PAYLOGS';
export const SET_SEARCH_TEXT = '[PAYLOGS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PAYLOGS = '[PAYLOGS APP] TOGGLE IN SELECTED PAYLOGS';
export const SELECT_ALL_PAYLOGS = '[PAYLOGS APP] SELECT ALL PAYLOGS';
export const DESELECT_ALL_PAYLOGS = '[PAYLOGS APP] DESELECT ALL PAYLOGS';
export const OPEN_NEW_PAYLOG_DIALOG = '[PAYLOGS APP] OPEN NEW PAYLOG DIALOG';
export const CLOSE_NEW_PAYLOG_DIALOG = '[PAYLOGS APP] CLOSE NEW PAYLOG DIALOG';
export const OPEN_EDIT_PAYLOG_DIALOG = '[PAYLOGS APP] OPEN EDIT PAYLOG DIALOG';
export const CLOSE_EDIT_PAYLOG_DIALOG = '[PAYLOGS APP] CLOSE EDIT PAYLOG DIALOG';
export const ADD_PAYLOG = '[PAYLOGS APP] ADD PAYLOG';
export const UPDATE_PAYLOG = '[PAYLOGS APP] UPDATE PAYLOG';
export const REMOVE_PAYLOG = '[PAYLOGS APP] REMOVE PAYLOG';
export const REMOVE_PAYLOGS = '[PAYLOGS APP] REMOVE PAYLOGS';
export const TOGGLE_STARRED_PAYLOG = '[PAYLOGS APP] TOGGLE STARRED PAYLOG';
export const TOGGLE_STARRED_PAYLOGS = '[PAYLOGS APP] TOGGLE STARRED PAYLOGS';
export const SET_PAYLOGS_STARRED = '[PAYLOGS APP] SET PAYLOGS STARRED ';


export function getPaylogs(routeParams, userUID) {
    return (dispatch, getState) => {

        // let ref = firebaseService.db.ref(`payments`);
        let ref = firebaseService.db.ref(`payments`);

        switch (routeParams.id) {
            case 'starred':
                ref = ref.orderByChild("starred").equalTo(true)
                break;
            default:
        }
        ref
            .once('value')
            .then(snapshot => {
                let paylogs = snapshot.val();
                console.log("paylogs ", paylogs)
                if (paylogs !== null) {
                    _.forEach(paylogs, function(value, key) {
                        if (value) value.id = key;
                    });
                } else {
                    paylogs = [];
                }
                return dispatch({
                    type: GET_PAYLOGS,
                    payload: paylogs,
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

export function toggleInSelectedPaylogs(paylogId) {
    return {
        type: TOGGLE_IN_SELECTED_PAYLOGS,
        paylogId
    };
}

export function selectAllPaylogs() {
    return {
        type: SELECT_ALL_PAYLOGS
    };
}

export function deSelectAllPaylogs() {
    return {
        type: DESELECT_ALL_PAYLOGS
    };
}

// export function openNewPaylogDialog() {
//     return {
//         type: OPEN_NEW_PAYLOG_DIALOG
//     };
// }

export function closeNewPaylogDialog() {
    return {
        type: CLOSE_NEW_PAYLOG_DIALOG
    };
}

export function openEditPaylogDialog(data) {
    return {
        type: OPEN_EDIT_PAYLOG_DIALOG,
        data
    };
}

export function closeEditPaylogDialog() {
    return {
        type: CLOSE_EDIT_PAYLOG_DIALOG
    };
}

export function addPaylog(newPaylog, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paylogsApp.paylogs;
        firebaseService.db.ref(`payments`)
            .push(newPaylog)
            .then(snapshot => {
                Promise.all([
                    dispatch({
                        type: ADD_PAYLOG
                    })
                ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
            });
    };
}

export function updatePaylog(paylog, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().paylogsApp.paylogs;
     
        console.log("paylog ", paylog)
        firebaseService.db.ref(`payments`).child(paylog.id).update(paylog).then(() => {
            Promise.all([
                dispatch({
                    type: ADD_PAYLOG
                })
            ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

// export function removePaylog(paylogId, userUID) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().paylogsApp.paylogs;
//         const id = paylogId;
//         firebaseService.db.ref(`payments/${id}`).remove().then(() => {
//             Promise.all([
//                 dispatch({
//                     type: REMOVE_PAYLOG
//                 })
//             ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
//         }).catch(error => {
//             return {
//                 errorCode: error.code,
//                 errorMessage: error.message
//             }
//         });
//     };
// }

// export function removePaylogs(paylogIds, userUID) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().paylogsApp.paylogs;

//         let promises = [];
//         paylogIds.forEach(element => {
//             promises.push(firebaseService.db.ref(`payments/${element}`).remove());
//         });

//         return Promise.all(promises).then(result => {
//             Promise.all([
//                 dispatch({
//                     type: REMOVE_PAYLOGS
//                 })
//             ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
//         });
//     };
// }

// export function toggleStarredPaylog(paylogId, userUID) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().paylogsApp.paylogs;


//         firebaseService.db.ref(`payments`).child(paylogId).once("value", function(snapshot) {
//             let paylog = snapshot.val();
//             if (paylog.starred === undefined || paylog.starred === false) {
//                 paylog.starred = true;
//             } else {
//                 paylog.starred = false;
//             }
//             firebaseService.db.ref(`payments`).child(paylogId).update(paylog).then(() => {
//                 Promise.all([
//                     dispatch({
//                         type: TOGGLE_STARRED_PAYLOG
//                     })
//                 ]).then(() => dispatch(getPaylogs(routeParams, userUID)))
//             });
//         });
//     };
// }

// export function toggleStarredPaylogs(paylogIds, userUID) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().paylogsApp.paylogs;

//         let promises = [];
//         paylogIds.forEach(element => {
//             promises.push(firebaseService.db.ref(`payments`).child(element).update({ starred: true }));
//         });

//         return Promise.all(promises).then(result => {
//             Promise.all([
//                 dispatch({
//                     type: TOGGLE_STARRED_PAYLOGS
//                 }),
//                 dispatch({
//                     type: DESELECT_ALL_PAYLOGS
//                 }),
//             ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
//         });

//         // const request = axios.post('/api/paylogs-app/toggle-starred-paylogs', {
//         //     paylogIds
//         // });

//         // return request.then(response =>
//         //     Promise.all([
//         //         dispatch({
//         //             type: TOGGLE_STARRED_PAYLOGS
//         //         }),
//         //         dispatch({
//         //             type: DESELECT_ALL_PAYLOGS
//         //         }),
//         //         dispatch(getUserData())
//         //     ]).then(() => dispatch(getPaylogs(routeParams, userUID)))
//         // );
//     };
// }

// export function setPaylogsStarred(paylogIds, userUID) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().paylogsApp.paylogs;

//         let promises = [];
//         paylogIds.forEach(element => {
//             promises.push(firebaseService.db.ref(`payments`).child(element).update({ starred: true }));
//         });

//         return Promise.all(promises).then(result => {
//             Promise.all([
//                 dispatch({
//                     type: TOGGLE_STARRED_PAYLOGS
//                 }),
//                 dispatch({
//                     type: DESELECT_ALL_PAYLOGS
//                 }),
//             ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
//         });
//     };
// }

// export function setPaylogsUnstarred(paylogIds, userUID) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().paylogsApp.paylogs;

//         let promises = [];
//         paylogIds.forEach(element => {
//             promises.push(firebaseService.db.ref(`payments`).child(element).update({ starred: false }));
//         });

//         return Promise.all(promises).then(result => {
//             Promise.all([
//                 dispatch({
//                     type: TOGGLE_STARRED_PAYLOGS
//                 }),
//                 dispatch({
//                     type: DESELECT_ALL_PAYLOGS
//                 }),
//             ]).then(() => dispatch(getPaylogs(routeParams, userUID)));
//         });
//     };
// }
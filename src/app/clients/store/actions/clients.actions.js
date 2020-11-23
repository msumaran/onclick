import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';

export const GET_CLIENTS = '[CLIENTS APP] GET CLIENTS';
export const SET_SEARCH_TEXT = '[CLIENTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CLIENTS = '[CLIENTS APP] TOGGLE IN SELECTED CLIENTS';
export const SELECT_ALL_CLIENTS = '[CLIENTS APP] SELECT ALL CLIENTS';
export const DESELECT_ALL_CLIENTS = '[CLIENTS APP] DESELECT ALL CLIENTS';
export const OPEN_NEW_CLIENT_DIALOG = '[CLIENTS APP] OPEN NEW CLIENT DIALOG';
export const CLOSE_NEW_CLIENT_DIALOG = '[CLIENTS APP] CLOSE NEW CLIENT DIALOG';
export const OPEN_EDIT_CLIENT_DIALOG = '[CLIENTS APP] OPEN EDIT CLIENT DIALOG';
export const CLOSE_EDIT_CLIENT_DIALOG = '[CLIENTS APP] CLOSE EDIT CLIENT DIALOG';
export const ADD_CLIENT = '[CLIENTS APP] ADD CLIENT';
export const UPDATE_CLIENT = '[CLIENTS APP] UPDATE CLIENT';
export const REMOVE_CLIENT = '[CLIENTS APP] REMOVE CLIENT';
export const REMOVE_CLIENTS = '[CLIENTS APP] REMOVE CLIENTS';
export const TOGGLE_STARRED_CLIENT = '[CLIENTS APP] TOGGLE STARRED CLIENT';
export const TOGGLE_STARRED_CLIENTS = '[CLIENTS APP] TOGGLE STARRED CLIENTS';
export const SET_CLIENTS_STARRED = '[CLIENTS APP] SET CLIENTS STARRED ';


export function getClients(routeParams, userUID) {
    return (dispatch, getState) => {

        // let ref = firebaseService.db.ref(`users`);
        let ref = firebaseService.db.ref(`users`);

        switch (routeParams.id) {
            case 'starred':
                ref = ref.orderByChild("starred").equalTo(true)
                break;
            default:
        }
        ref
            .once('value')
            .then(snapshot => {
                let clients = snapshot.val();
                console.log("clients ", clients)
                if (clients !== null) {
                    _.forEach(clients, function(value, key) {
                        if (value) value.id = key;
                    });
                } else {
                    clients = [];
                }
                return dispatch({
                    type: GET_CLIENTS,
                    payload: clients,
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

export function toggleInSelectedClients(clientId) {
    return {
        type: TOGGLE_IN_SELECTED_CLIENTS,
        clientId
    };
}

export function selectAllClients() {
    return {
        type: SELECT_ALL_CLIENTS
    };
}

export function deSelectAllClients() {
    return {
        type: DESELECT_ALL_CLIENTS
    };
}

export function openNewClientDialog() {
    return {
        type: OPEN_NEW_CLIENT_DIALOG
    };
}

export function closeNewClientDialog() {
    return {
        type: CLOSE_NEW_CLIENT_DIALOG
    };
}

export function openEditClientDialog(data) {
    return {
        type: OPEN_EDIT_CLIENT_DIALOG,
        data
    };
}

export function closeEditClientDialog() {
    return {
        type: CLOSE_EDIT_CLIENT_DIALOG
    };
}

export function addClient(newClient, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;
        firebaseService.db.ref(`users`)
            .push(newClient)
            .then(snapshot => {
                Promise.all([
                    dispatch({
                        type: ADD_CLIENT
                    })
                ]).then(() => dispatch(getClients(routeParams, userUID)));
            });
    };
}

export function updateClient(client, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;
     
        console.log("client ", client)
        firebaseService.db.ref(`users`).child(client.id).update(client).then(() => {
            Promise.all([
                dispatch({
                    type: ADD_CLIENT
                })
            ]).then(() => dispatch(getClients(routeParams, userUID)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removeClient(clientId, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;
        const id = clientId;
        firebaseService.db.ref(`users/${id}`).remove().then(() => {
            Promise.all([
                dispatch({
                    type: REMOVE_CLIENT
                })
            ]).then(() => dispatch(getClients(routeParams, userUID)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removeClients(clientIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;

        let promises = [];
        clientIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users/${element}`).remove());
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: REMOVE_CLIENTS
                })
            ]).then(() => dispatch(getClients(routeParams, userUID)));
        });
    };
}

export function toggleStarredClient(clientId, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;


        firebaseService.db.ref(`users`).child(clientId).once("value", function(snapshot) {
            let client = snapshot.val();
            if (client.starred === undefined || client.starred === false) {
                client.starred = true;
            } else {
                client.starred = false;
            }
            firebaseService.db.ref(`users`).child(clientId).update(client).then(() => {
                Promise.all([
                    dispatch({
                        type: TOGGLE_STARRED_CLIENT
                    })
                ]).then(() => dispatch(getClients(routeParams, userUID)))
            });
        });
    };
}

export function toggleStarredClients(clientIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;

        let promises = [];
        clientIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users`).child(element).update({ starred: true }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CLIENTS
                }),
                dispatch({
                    type: DESELECT_ALL_CLIENTS
                }),
            ]).then(() => dispatch(getClients(routeParams, userUID)));
        });

        // const request = axios.post('/api/clients-app/toggle-starred-clients', {
        //     clientIds
        // });

        // return request.then(response =>
        //     Promise.all([
        //         dispatch({
        //             type: TOGGLE_STARRED_CLIENTS
        //         }),
        //         dispatch({
        //             type: DESELECT_ALL_CLIENTS
        //         }),
        //         dispatch(getUserData())
        //     ]).then(() => dispatch(getClients(routeParams, userUID)))
        // );
    };
}

export function setClientsStarred(clientIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;

        let promises = [];
        clientIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users`).child(element).update({ starred: true }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CLIENTS
                }),
                dispatch({
                    type: DESELECT_ALL_CLIENTS
                }),
            ]).then(() => dispatch(getClients(routeParams, userUID)));
        });
    };
}

export function setClientsUnstarred(clientIds, userUID) {
    return (dispatch, getState) => {
        const { routeParams } = getState().clientsApp.clients;

        let promises = [];
        clientIds.forEach(element => {
            promises.push(firebaseService.db.ref(`users`).child(element).update({ starred: false }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CLIENTS
                }),
                dispatch({
                    type: DESELECT_ALL_CLIENTS
                }),
            ]).then(() => dispatch(getClients(routeParams, userUID)));
        });
    };
}
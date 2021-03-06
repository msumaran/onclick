import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CONTACTS = '[CONTACTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[CONTACTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[CONTACTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';

export function getContacts(routeParams) {
    return (dispatch, getState) => {
        let ref = firebaseService.db.ref(`contacts`);

        switch (routeParams.id) {
            case 'starred':
                ref = ref.orderByChild("starred").equalTo(true)
                break;
            default:

        }
        ref
            .once('value')
            .then(snapshot => {
                let contacts = snapshot.val();
                if (contacts !== null) {
                    _.forEach(contacts, function(value, key) {
                        if (value) value.id = key;
                    });
                } else {
                    contacts = [];
                }
                return dispatch({
                    type: GET_CONTACTS,
                    payload: contacts,
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

export function toggleInSelectedContacts(contactId) {
    return {
        type: TOGGLE_IN_SELECTED_CONTACTS,
        contactId
    };
}

export function selectAllContacts() {
    return {
        type: SELECT_ALL_CONTACTS
    };
}

export function deSelectAllContacts() {
    return {
        type: DESELECT_ALL_CONTACTS
    };
}

export function openNewContactDialog() {
    return {
        type: OPEN_NEW_CONTACT_DIALOG
    };
}

export function closeNewContactDialog() {
    return {
        type: CLOSE_NEW_CONTACT_DIALOG
    };
}

export function openEditContactDialog(data) {
    return {
        type: OPEN_EDIT_CONTACT_DIALOG,
        data
    };
}

export function closeEditContactDialog() {
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    };
}

export function addContact(newContact) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;
        firebaseService.db.ref(`contacts`)
            .push(newContact)
            .then(snapshot => {
                Promise.all([
                    dispatch({
                        type: ADD_CONTACT
                    })
                ]).then(() => dispatch(getContacts(routeParams)));
            });
    };
}

export function updateContact(contact) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;
     
        firebaseService.db.ref('contacts').child(contact.id).update(contact).then(() => {
            Promise.all([
                dispatch({
                    type: ADD_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removeContact(contactId) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;
        const id = contactId;
        firebaseService.db.ref(`contacts/${id}`).remove().then(() => {
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)));
        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
    };
}

export function removeContacts(contactIds) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;

        let promises = [];
        contactIds.forEach(element => {
            promises.push(firebaseService.db.ref(`contacts/${element}`).remove());
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACTS
                })
            ]).then(() => dispatch(getContacts(routeParams)));
        });
    };
}

export function toggleStarredContact(contactId) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;


        firebaseService.db.ref('contacts').child(contactId).once("value", function(snapshot) {
            let contact = snapshot.val();
            if (contact.starred === undefined || contact.starred === false) {
                contact.starred = true;
            } else {
                contact.starred = false;
            }
            firebaseService.db.ref('contacts').child(contactId).update(contact).then(() => {
                Promise.all([
                    dispatch({
                        type: TOGGLE_STARRED_CONTACT
                    })
                ]).then(() => dispatch(getContacts(routeParams)))
            });
        });
    };
}

export function toggleStarredContacts(contactIds) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;

        let promises = [];
        contactIds.forEach(element => {
            promises.push(firebaseService.db.ref('contacts').child(element).update({ starred: true }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
            ]).then(() => dispatch(getContacts(routeParams)));
        });

        // const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
        //     contactIds
        // });

        // return request.then(response =>
        //     Promise.all([
        //         dispatch({
        //             type: TOGGLE_STARRED_CONTACTS
        //         }),
        //         dispatch({
        //             type: DESELECT_ALL_CONTACTS
        //         }),
        //         dispatch(getUserData())
        //     ]).then(() => dispatch(getContacts(routeParams)))
        // );
    };
}

export function setContactsStarred(contactIds) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;

        let promises = [];
        contactIds.forEach(element => {
            promises.push(firebaseService.db.ref('contacts').child(element).update({ starred: true }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
            ]).then(() => dispatch(getContacts(routeParams)));
        });
    };
}

export function setContactsUnstarred(contactIds) {
    return (dispatch, getState) => {
        const { routeParams } = getState().tagsApp.contacts;

        let promises = [];
        contactIds.forEach(element => {
            promises.push(firebaseService.db.ref('contacts').child(element).update({ starred: false }));
        });

        return Promise.all(promises).then(result => {
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
            ]).then(() => dispatch(getContacts(routeParams)));
        });
    };
}
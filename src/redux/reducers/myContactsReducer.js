
const defaultState = {
    contacts: [],
    loading: false,
    loaded: false,
    reloading: false,
}

const myContactsReducer = (state = defaultState, action) => {

    const st = Object.assign({}, state)

    switch(action.type) {
        case 'MY_CONTACTS_RELOAD_ALL':
            st.reloading = true
            break
        case 'MY_CONTACTS_FIND_ALL_START':
            st.loading = true
            st.reloading = false
            break
        case 'MY_CONTACTS_FIND_ALL_END':
            st.contacts = action.payload
            st.loaded = true
            st.loading = false
            st.reloading = false
            break
        default:
            //
    }

    return st
}

export default myContactsReducer


const defaultState = {
    contacts: [],
    loaded: false,
}

const myContactsReducer = (state = defaultState, action) => {

    const st = Object.assign({}, state)

    switch(action.type) {
        case 'MY_CONTACTS_FIND_ALL':
            st.contacts = action.payload
            st.loaded = true
            break
    }

    return st
}

export default myContactsReducer

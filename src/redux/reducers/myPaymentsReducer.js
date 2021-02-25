
const defaultState = {
    payments: [],
    loaded: false,
}

const myPaymentsReducer = (state = defaultState, action) => {

    const st = Object.assign({}, state)

    switch(action.type) {
        case 'MY_PAYMENTS_FIND_ALL':
            st.payments = action.payload
            st.loaded = true
            break
        case 'MY_PAYMENTS_CREATE':

            if (action.payload) {

                st.payments = [...st.payments, action.payload]
            }
            break
    }

    return st
}

export default myPaymentsReducer

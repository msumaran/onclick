
import inquiriesApi from 'services/inquiriesApi'

import { toast } from 'react-toastify'
import { toastDefaults } from 'helpers/config'

export const INQUIRIES_LOAD_REQUEST = 'inquiries-load-request'
export const INQUIRIES_LOAD_SUCCESS = 'inquiries-load-success'
export const INQUIRIES_LOAD_ERROR = 'inquiries-load-error'

const initialState = {
    result: [],
    load_status: '',
}

export const InquiriesReducer = (state = initialState, action) => {

    const st = Object.assign({}, state)

    if (action.type === INQUIRIES_LOAD_REQUEST) {

        st.load_status = 'loading'
    } else if (action.type === INQUIRIES_LOAD_SUCCESS) {

        st.load_status = 'loaded'
        st.result = action.content.result
    } else if (action.type === INQUIRIES_LOAD_ERROR) {

        st.load_status = 'error'
    }

    return st
}

const ActionFindAll = () => {

    return async (dispatch) => {

        dispatch({
            type: INQUIRIES_LOAD_REQUEST
        })

        try {

            const data = await inquiriesApi.findAll()

            dispatch({
                type: INQUIRIES_LOAD_SUCCESS,
                content: {
                    result: data.content
                }
            })
        } catch (error) {

            dispatch({
                type: INQUIRIES_LOAD_ERROR
            })

            throw error
        }
    }
}

export default {
    ActionFindAll,
}

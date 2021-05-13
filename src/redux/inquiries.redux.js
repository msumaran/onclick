
import inquiriesApi from 'services/inquiriesApi'

import { toast } from 'react-toastify'
import { toastDefaults } from 'helpers/config'

export const INQUIRIES_LOAD_REQUEST = 'inquiries-load-request'
export const INQUIRIES_LOAD_SUCCESS = 'inquiries-load-success'
export const INQUIRIES_LOAD_ERROR = 'inquiries-load-error'

export const INQUIRIES_LOAD_CHECK_ERROR = 'inquiries-load-check-error'
export const INQUIRIES_LOAD_CHECK_REQUEST = 'inquiries-load-check-request'
export const INQUIRIES_LOAD_CHECK_SUCCESS = 'inquiries-load-check-success'

const initialState = {
    result: [],
    load_status: '',
    load_check_status: '',
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

    else if (action.type === INQUIRIES_LOAD_CHECK_REQUEST) {
        st.load_check_status = 'loading'
    } else if (action.type === INQUIRIES_LOAD_CHECK_SUCCESS) {
        st.load_check_status = 'loaded' 
    } else if (action.type === INQUIRIES_LOAD_CHECK_ERROR) {
        st.load_check_status = 'error'
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

const ActionCheck = (id) => {
    return async (dispatch) => {

        dispatch({
            type: INQUIRIES_LOAD_CHECK_REQUEST
        })

        try {

            const data = await inquiriesApi.check(id)

            dispatch({
                type: INQUIRIES_LOAD_CHECK_SUCCESS,
                content: {
                    result: data.content
                }
            })

            dispatch(ActionFindAll())

        } catch (error) {

            dispatch({
                type: INQUIRIES_LOAD_CHECK_ERROR
            })

            throw error
        }
    }
}

export default {
    ActionFindAll,
    ActionCheck
}

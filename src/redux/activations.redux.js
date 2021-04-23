
import activationsApi from 'services/activationsApi'

import { toast } from 'react-toastify'
import { toastDefaults } from 'helpers/config'

export const ACTIVATIONS_LOAD_REQUEST = 'activations-load-request'
export const ACTIVATIONS_LOAD_SUCCESS = 'activations-load-success'
export const ACTIVATIONS_LOAD_ERROR = 'activations-load-error'

const initialState = {
    result: [],
    load_status: '',
}

export const ActivationsReducer = (state = initialState, action) => {

    const st = Object.assign({}, state)

    if (action.type === ACTIVATIONS_LOAD_REQUEST) {

        st.load_status = 'loading'
    } else if (action.type === ACTIVATIONS_LOAD_SUCCESS) {

        st.load_status = 'loaded'
        st.result = action.content.result
    } else if (action.type === ACTIVATIONS_LOAD_ERROR) {

        st.load_status = 'error'
    }

    return st
}

const findAll = () => {

    return async (dispatch) => {

        dispatch({
            type: ACTIVATIONS_LOAD_REQUEST
        })

        try {

            const data = await activationsApi.findAll()

            dispatch({
                type: ACTIVATIONS_LOAD_SUCCESS,
                content: {
                    result: data.content
                }
            })
        } catch (error) {

            dispatch({
                type: ACTIVATIONS_LOAD_ERROR
            })

            throw error
        }
    }
}

const ActivationActions = {
    findAll,
}

export default ActivationActions

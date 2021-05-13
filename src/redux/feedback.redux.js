
import feedbackApi from 'services/feedbackApi'

const FEEDBACK_LOAD_REQUEST = 'FEEDBACK_LOAD_REQUEST'
const FEEDBACK_LOAD_SUCCESS = 'FEEDBACK_LOAD_SUCCESS'
const FEEDBACK_LOAD_ERROR = 'FEEDBACK_LOAD_ERROR'
const FEEDBACK_CREATE_REQUEST = 'FEEDBACK_CREATE_REQUEST'
const FEEDBACK_CREATE_SUCCESS = 'FEEDBACK_CREATE_SUCCESS'
const FEEDBACK_CREATE_ERROR = 'FEEDBACK_CREATE_ERROR'
const FEEDBACK_RELOAD_REQUEST = 'FEEDBACK_RELOAD_REQUEST'

const initialState = {
    result: [],
    load_status: '',
    create_status: '',
    reloading: false,
}

export const FeedbackReducer = (state = initialState, action) => {

    const st = Object.assign({}, state)

    if (action.type === FEEDBACK_LOAD_REQUEST) {

        st.load_status = 'loading'
    } else if (action.type === FEEDBACK_LOAD_SUCCESS) {

        st.load_status = 'loaded'
        st.result = action.content.result
        st.reloading = false
    } else if (action.type === FEEDBACK_LOAD_ERROR) {

        st.load_status = 'error'
    } else if (action.type === FEEDBACK_CREATE_REQUEST) {

        st.create_status = 'creating'
    } else if (action.type === FEEDBACK_CREATE_SUCCESS) {

        st.create_status = 'created'
    } else if (action.type === FEEDBACK_CREATE_ERROR) {

        st.create_status = 'error'
    } else if (action.type === FEEDBACK_RELOAD_REQUEST) {

        st.reloading = true
    }

    return st
}

const findAll = (reloading = false) => {

    return async (dispatch) => {

        if (reloading) {

            dispatch({
                type: FEEDBACK_RELOAD_REQUEST
            })
        } else {

            dispatch({
                type: FEEDBACK_LOAD_REQUEST
            })
        }

        try {

            const data = await feedbackApi.findAll()

            dispatch({
                type: FEEDBACK_LOAD_SUCCESS,
                content: {
                    result: data.content
                }
            })
        } catch (error) {

            dispatch({
                type: FEEDBACK_LOAD_ERROR
            })

            throw error
        }
    }
}

const createRow = (feedback_data) => {

    return async (dispatch) => {

        dispatch({
            type: FEEDBACK_CREATE_REQUEST
        })

        try {

            await feedbackApi.create(feedback_data)

            dispatch({
                type: FEEDBACK_CREATE_SUCCESS,
            })
        } catch (error) {

            dispatch({
                type: FEEDBACK_CREATE_ERROR
            })

            throw error
        }
    }
}

const reloadAll = () => {

    return async (dispatch) => {

        dispatch(findAll(true))
    }
}

const FeedbackActions = {
    findAll,
    createRow,
    reloadAll
}

export default FeedbackActions

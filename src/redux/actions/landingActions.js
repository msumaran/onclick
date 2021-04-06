
import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'
import api from 'services/landingApi'

const getMyLanding = () => {

    return async (dispatch) => {

        try {

            const data = await api.getMyLanding()

            dispatch({
                type: 'LANDING_LOAD_FROM_DB',
                payload: {
                    code: data.content.code,
                    html: data.content.html,
                    seo: data.content.seo
                }
            })
        } catch (error) {
            if (configApp.env === 'dev') console.log('landingAction.findAll', error)

            handleCatchNotify(error)
        }
    }
}

const saveDraft = (data) => {

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_DRAFT_TO_DB_START',
        })

        try {
            await api.saveMyLanding(data)

            dispatch({
                type: 'LANDING_SAVE_DRAFT_TO_DB_END',
            })
        } catch (error) {

            dispatch({
                type: 'LANDING_SAVE_DRAFT_TO_DB_ERROR',
            })
        }
    }
}

const publish = (data) => {

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_PUBLISH_START',
        })

        try {
            await api.saveMyLanding(data)

            dispatch({
                type: 'LANDING_PUBLISH_END',
            })
        } catch (error) {

            dispatch({
                type: 'LANDING_PUBLISH_ERROR',
            })
        }
    }
}

export default {
    getMyLanding,
    saveDraft,
    publish,
}

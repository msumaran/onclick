
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
                }
            })
        } catch (error) {
            if (configApp.env === 'dev') console.log('landingAction.findAll', error)

            handleCatchNotify(error)
        }
    }
}

const saveMyLanding = (code, html) => {

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_TO_DB_START',
        })

        try {
            await api.saveMyLanding(code, html)

            dispatch({
                type: 'LANDING_SAVE_TO_DB_END',
            })
        } catch (error) {

            dispatch({
                type: 'LANDING_SAVE_TO_DB_ERROR',
            })
        }
    }
}

export default {
    getMyLanding,
    saveMyLanding,
}

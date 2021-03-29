
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
                    title: data.content.title,
                    description: data.content.description,
                    og_title: data.content.og_title,
                    og_description: data.content.og_description,
                    og_type: data.content.og_type,
                    og_site_name: data.content.og_site_name,
                }
            })
        } catch (error) {
            if (configApp.env === 'dev') console.log('landingAction.findAll', error)

            handleCatchNotify(error)
        }
    }
}

const saveMyLanding = (data, publish = false) => {

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_TO_DB_START',
        })

        try {
            await api.saveMyLanding(data, publish)

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


import { toast } from 'react-toastify'

import { toastDefaults } from 'helpers/config'
import landingApi from 'services/landingApi'

const getMyLanding = () => {

    return async (dispatch) => {

        try {

            const data = await landingApi.getMyLanding()

            dispatch({
                type: 'LANDING_LOAD_FROM_DB',
                payload: {
                    code: data.content.code,
                    html: data.content.html,
                    seo: data.content.seo
                }
            })
        } catch (error) {
        }
    }
}

const saveDraft = (data) => {

    data.action = 'save_draft'

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_DRAFT_TO_DB_START',
        })

        try {
            const _data = await landingApi.saveMyLanding(data)

            dispatch({
                type: 'LANDING_SAVE_DRAFT_TO_DB_END',
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'LANDING_SAVE_DRAFT_TO_DB_ERROR',
            })
        }
    }
}

const publish = (data) => {

    data.action = 'publish'

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_PUBLISH_START',
        })

        try {
            const _data = await landingApi.saveMyLanding(data)

            dispatch({
                type: 'LANDING_PUBLISH_END',
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'LANDING_PUBLISH_ERROR',
            })
        }
    }
}

const saveSeo = (seo) => {

    const data = {
        action: 'save_seo',
        seo
    }

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_SEO_START',
        })

        try {
            const _data = await landingApi.saveMyLanding(data)

            dispatch({
                type: 'LANDING_SAVE_SEO_END',
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'LANDING_SAVE_SEO_ERROR',
            })
        }
    }
}

export default {
    getMyLanding,
    saveDraft,
    publish,
    saveSeo,
}

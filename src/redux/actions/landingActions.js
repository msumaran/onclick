
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
                    id: data.content.id,
                    code: data.content.code,
                    html: data.content.html,
                    seo: data.content.seo,
                    messages: data.content.messages
                }
            })
        } catch (error) {

            throw error
        }
    }
}

const validateSlug = (landingId, slug) => {

    return async (dispatch) => {

        // dispatch({
        //     type: 'LANDING_VALIDATE_SLUG_START'
        // })

        try {
            const data = await landingApi.validateSlug(landingId, slug)

            // dispatch({
            //     type: 'LANDING_VALIDATE_SLUG_SUCCESS',
            // })

            return data.content.isValid
        } catch (error) {

            // dispatch({
            //     type: 'LANDING_VALIDATE_SLUG_ERROR'
            // })

            throw error
        }
    }
}

const saveDraft = (data) => {

    data.action = 'save_draft'

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_DRAFT_TO_DB_START',
            payload: {
                code: data.code
            }
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
            payload: {
                code: data.code
            }
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
                payload: seo
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'LANDING_SAVE_SEO_ERROR',
            })
        }
    }
}

const saveMessages = (messages) => {

    const data = {
        action: 'save_messages',
        messages
    }

    return async (dispatch) => {

        dispatch({
            type: 'LANDING_SAVE_MESSAGES_START',
        })

        try {
            const _data = await landingApi.saveMyLanding(data)

            dispatch({
                type: 'LANDING_SAVE_MESSAGES_END',
                payload: messages
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'LANDING_SAVE_MESSAGES_ERROR',
            })
        }
    }
}

export default {
    getMyLanding,
    validateSlug,
    saveDraft,
    publish,
    saveSeo,
    saveMessages,
}

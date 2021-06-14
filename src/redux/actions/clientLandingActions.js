
import { toast } from 'react-toastify'
import { toastDefaults } from 'helpers/config'

import clientLandingApi from 'services/clientLandingApi'

const getClientLanding = (client_id) => {

    return async (dispatch) => {

        try {

            const data = await clientLandingApi.getClientLanding(client_id)

            dispatch({
                type: 'CLIENT_LANDING_LOAD_FROM_DB',
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
            const data = await clientLandingApi.validateSlug(landingId, slug)

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

const saveDraft = (client_id, data) => {

    data.action = 'save_draft'

    return async (dispatch) => {

        dispatch({
            type: 'CLIENT_LANDING_SAVE_DRAFT_TO_DB_START',
            payload: {
                code: data.code
            }
        })

        try {
            const _data = await clientLandingApi.saveClientLanding(client_id, data)

            dispatch({
                type: 'CLIENT_LANDING_SAVE_DRAFT_TO_DB_END',
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'CLIENT_LANDING_SAVE_DRAFT_TO_DB_ERROR',
            })
        }
    }
}

const publish = (client_id, data) => {

    data.action = 'publish'

    return async (dispatch) => {

        dispatch({
            type: 'CLIENT_LANDING_PUBLISH_START',
            payload: {
                code: data.code
            }
        })

        try {
            const _data = await clientLandingApi.saveClientLanding(client_id, data)

            dispatch({
                type: 'CLIENT_LANDING_PUBLISH_END',
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'CLIENT_LANDING_PUBLISH_ERROR',
            })
        }
    }
}

const saveSeo = (client_id, seo) => {

    const data = {
        action: 'save_seo',
        seo
    }

    return async (dispatch) => {

        dispatch({
            type: 'CLIENT_LANDING_SAVE_SEO_START',
        })

        try {
            const _data = await clientLandingApi.saveClientLanding(client_id, data)

            dispatch({
                type: 'CLIENT_LANDING_SAVE_SEO_END',
                payload: seo
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'CLIENT_LANDING_SAVE_SEO_ERROR',
            })
        }
    }
}

const saveMessages = (client_id, messages) => {

    const data = {
        action: 'save_messages',
        messages
    }

    return async (dispatch) => {

        dispatch({
            type: 'CLIENT_LANDING_SAVE_MESSAGES_START',
        })

        try {
            const _data = await clientLandingApi.saveClientLanding(client_id, data)

            dispatch({
                type: 'CLIENT_LANDING_SAVE_MESSAGES_END',
                payload: messages
            })

            toast.success(_data.message, toastDefaults)
        } catch (error) {

            dispatch({
                type: 'CLIENT_LANDING_SAVE_MESSAGES_ERROR',
            })
        }
    }
}

export default {
    getClientLanding,
    validateSlug,
    saveDraft,
    publish,
    saveSeo,
    saveMessages,
}

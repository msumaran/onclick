
import sample from './sample.json'

const initialState = {
    code: JSON.stringify(sample),
    waiting_for_publish: false,
    html: '',
    seo: {
        title: '',
        description: '',
        og_title: '',
        og_description: '',
        og_type: 'website',
        og_site_name: '',
    },
    messages:{
        success: '',
        faill: '',
    },
    loaded: false,
    saveDraftStatus: '',
    publishStatus: '',
    saveSeoStatus: '',
    saveMessagesStatus: '',
}

const landingReducer = (state = initialState, { type, payload }) => {

    const st = Object.assign({}, state)

    switch(type) {
        case 'LANDING_LOAD_FROM_DB':

            if (payload.code !== '{}') {

                st.code = payload.code
                st.waiting_for_publish = payload.code_draft === '1' ? true : false
            }

            st.html = payload.html
            st.seo.title = payload.seo.title || ''
            st.seo.description = payload.seo.description || ''
            st.seo.og_title = payload.seo.og_title || ''
            st.seo.og_description = payload.seo.og_description || ''
            st.seo.og_type = payload.seo.og_type || ''
            st.seo.og_site_name = payload.seo.og_site_name || ''
            st.messages.success = payload.messages.success || ''
            st.messages.faill = payload.messages.faill || ''
            st.loaded = true
            break
        case 'LANDING_SAVE_DRAFT_TO_DB_START':
            st.saveDraftStatus = 'saving'
            st.code = payload.code
            break
        case 'LANDING_SAVE_DRAFT_TO_DB_END':
            st.saveDraftStatus = 'saved'
            break
        case 'LANDING_SAVE_DRAFT_TO_DB_ERROR':
            st.saveDraftStatus = 'error'
            break
        case 'LANDING_PUBLISH_START':
            st.publishStatus = 'publishing'
            st.code = payload.code
            break
        case 'LANDING_PUBLISH_END':
            st.publishStatus = 'published'
            break
        case 'LANDING_PUBLISH_ERROR':
            st.publishStatus = 'error'
            break
        case 'LANDING_SAVE_SEO_START':
            st.saveSeoStatus = 'saving'
            break
        case 'LANDING_SAVE_SEO_END':
            st.saveSeoStatus = 'saved'
            st.seo = payload
            break
        case 'LANDING_SAVE_SEO_ERROR':
            st.saveSeoStatus = 'error'
            break
        case 'LANDING_SAVE_MESSAGES_START':
            st.saveMessagesStatus = 'saving'
            break
        case 'LANDING_SAVE_MESSAGES_END':
            st.saveMessagesStatus = 'saved'
            st.seo = payload
            break
        case 'LANDING_SAVE_MESSAGES_ERROR':
            st.saveMessagesStatus = 'error'
            break
        default:
            //
    }

    return st
}

export default landingReducer
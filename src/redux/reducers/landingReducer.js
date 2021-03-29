
const initialState = {
    code: {},
    html: '',
    title: '',
    description: '',
    og_title: '',
    og_description: '',
    og_type: '',
    og_site_name: '',
    loaded: false,
    saveStatus: ''
}

const landingReducer = (state = initialState, { type, payload }) => {

    const st = Object.assign({}, state)

    switch(type) {
        case 'LANDING_LOAD_FROM_DB':
            st.code = payload.code
            st.html = payload.html
            st.title = payload.title || ''
            st.description = payload.description || ''
            st.og_title = payload.og_title || ''
            st.og_description = payload.og_description || ''
            st.og_type = payload.og_type || ''
            st.og_site_name = payload.og_site_name || ''
            st.loaded = true
            break
        case 'LANDING_SAVE_TO_DB_START':
            st.saveStatus = 'saving'
            break
        case 'LANDING_SAVE_TO_DB_END':
            st.saveStatus = 'saved'
            break
        case 'LANDING_SAVE_TO_DB_ERROR':
            st.saveStatus = 'error'
            break
    }

    return st
}

export default landingReducer
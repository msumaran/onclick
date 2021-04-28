
import axios from 'axios'
import { toast } from 'react-toastify'

import { getHeaders } from 'helpers/api'
import { configApp, toastDefaults } from 'helpers/config'

const baseUrl = configApp.baseUrl
const websiteUrl = configApp.websiteUrl

const get = async (endpoint) => {

    const headers = await getHeaders()

    onApiRequest(endpoint, 'GET', null, headers)

    try {

        const res = await axios.get(`${baseUrl}${endpoint}`, { headers })

        onApiResponse(endpoint, 'GET', res, headers)

        return res.data
    } catch (error) {

        onApiError(endpoint, 'GET', error, headers)

        throw error
    }
}

const post = async (endpoint, data) => {

    const headers = await getHeaders()

    onApiRequest(endpoint, 'POST', data, headers)

    try {

        const res = await axios.post(`${baseUrl}${endpoint}`, data, { headers })

        onApiResponse(endpoint, 'POST', res, headers)

        return res.data
    } catch (error) {

        onApiError(endpoint, 'POST', error, headers)

        throw error
    }
}

const postOut = async (endpoint, data) => {

    const headers = await getHeaders()

    onApiRequest(endpoint, 'POST', data, headers)

    try {

        const res = await axios.post(`${websiteUrl}${endpoint}`, data, { headers })

        onApiResponse(endpoint, 'POST', res, headers)

        return res.data
    } catch (error) {

        onApiError(endpoint, 'POST', error, headers)

        throw error
    }
}

const put = async (endpoint, data) => {

    const headers = await getHeaders()

    onApiRequest(endpoint, 'PUT', data, headers)

    try {

        const res = await axios.put(`${baseUrl}${endpoint}`, data, { headers })

        onApiResponse(endpoint, 'PUT', res, headers)

        return res.data
    } catch (error) {

        onApiError(endpoint, 'PUT', error, headers)

        throw error
    }
}

const del = async (endpoint) => {

    const headers = await getHeaders()

    onApiRequest(endpoint, 'DELETE', null, headers)

    try {

        const res = await axios.delete(`${baseUrl}${endpoint}`, { headers })

        onApiResponse(endpoint, 'DELETE', res, headers)

        return res.data
    } catch (error) {

        onApiError(endpoint, 'DELETE', error, headers)

        throw error
    }
}

const onApiRequest = (endpoint, method, data, headers) => {

    if (configApp.env !== 'dev') return

    console.group(`Request - ${method} ${endpoint}`)

    console.log('%cRequest Id: %c' + headers['X-ONCLICK-REQUEST-ID'], 'font-weight: bold;', 'color: red')

    if (method === 'POST' || method === 'PUT') {

        console.log('%cData', 'font-weight: bold;', data)
    }

    console.log('%cHeaders', 'font-weight: bold;', headers)

    console.groupEnd()
}

const onApiResponse = (endpoint, method, response, headers) => {

    if (configApp.env !== 'dev') return

    console.group(`Response - ${method} ${endpoint}`)

    console.log('%cId: %c' + headers['X-ONCLICK-REQUEST-ID'], 'font-weight: bold;', 'color: red')

    console.log('%cResponse', 'font-weight: bold;', response.data)

    console.groupEnd()
}

const onApiError = (endpoint, method, error, headers) => {

    let message
    let status = error.response ? error.response.status : undefined

    console.log('%cStatus', 'font-weight: bold;', status)

    if (!error.response) {

        message = error.message
    } else if (error.response.status === 401 || error.response.status === 422) {

        message = error.response.data.message
    } else if (error.response.status === 404) {

        message = 'Error de servidor'
    } else { 
        message = error.response.data.error
    }

    toast.error(message, toastDefaults)

    if (configApp.env !== 'dev') return

    console.group(`Request Error - ${method} ${endpoint}`)

    console.log('%cId: %c' + headers['X-ONCLICK-REQUEST-ID'], 'font-weight: bold;', 'color: red')

    console.log('%cMessage', 'font-weight: bold;', message)

    if (error.response) {

        console.log('%cResponse', 'font-weight: bold;', error.response.data)
    }

    console.groupEnd()
}

export default {
    get,
    post,
    put,
    del,
    postOut,
}

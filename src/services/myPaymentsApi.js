
import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

const apiUrl = `${configApp.baseUrl}/my-payments`

export const findAll = async () => {

    try {

        const headers = await getHeaders()

        const res = await axios.get(apiUrl + '/combobox', { headers })

        return res.data
    } catch (error) {

        handleError(error)
    }
}

export const create = async (data) => {

    try {

        const headers = await getHeaders()

        const res = await axios.post(apiUrl, data, { headers })

        return res.data
    } catch (error) {


        handleError(error)
    }
}

export default {
    findAll,
    create,
}

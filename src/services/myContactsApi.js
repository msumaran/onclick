
import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { configApp } from 'helpers/config'

const apiUrl = `${configApp.baseUrl}/my-contacts`

export const findAll = async () => {

    try {

        const headers = await getHeaders()

        const res = await axios.get(apiUrl + '/combobox', { headers })

        return res.data
    } catch (error) {

        handleError(error)
    }
}

export default {
    findAll,
}

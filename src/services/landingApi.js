
import axios from 'axios'

import { getHeaders, handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

const apiUrl = `${configApp.baseUrl}/my-landing`

const getMyLanding = async () => {

    try {

        const headers = await getHeaders()

        const res = await axios.get(apiUrl, { headers })

        return res.data
    } catch (error) {

        handleCatchNotify(error)
    }
}

const saveMyLanding = async (data) => {

    try {

        const headers = await getHeaders()

        const res = await axios.put(apiUrl, data, { headers })

        return res.data
    } catch (error) {

        handleCatchNotify(error)
    }
}

export default {
    getMyLanding,
    saveMyLanding,
}

import axios from 'axios'
import { getHeaders, handleError } from 'helpers/api'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/report`

const make = async (type, params = false) => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(params ? `${baseUrl}/${type}?${params}` : `${baseUrl}/${type}`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const reportApi = {
  make
}

export default reportApi

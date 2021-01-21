import axios from 'axios'
import { getHeaders, handleError } from 'helpers/api'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/dashboard/data`

const findAll = async () => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const dashboardApi = {
  findAll
}

export default dashboardApi

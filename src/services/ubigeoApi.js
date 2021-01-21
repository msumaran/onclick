import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/ubigee`

const findAll = async () => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}/combobox`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const findBy = async (criteria = [], orderBy = false, limit = false, offset = false) => {
  const params = {}
  params.criteria = criteria
  if (orderBy) params.orderBy = orderBy
  if (limit) params.limit = limit
  if (offset) params.offset = offset

  try {
    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}?${serialize(params)}`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const findBySegment = async () => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}/comboboxsegment`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const profileApi = {
  findAll,
  findBy,
  findBySegment
}

export default profileApi

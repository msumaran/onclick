import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/profile`

const findAll = async () => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(baseUrl + '/combobox', { headers })

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

const find = async (id) => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}/${id}`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const create = async (data) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(baseUrl, data, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const update = async (id, data) => {
  try {
    const headers = await getHeaders()

    // const res = await axios.put(`${baseUrl}/${id}`, data, { headers })
    const res = await axios.put(`${configApp.baseUrl}/setpermission`, data, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const remove = async (id) => {
  try {
    const headers = await getHeaders()

    const res = await axios.delete(`${baseUrl}/${id}`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const profileApi = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove
}

export default profileApi

import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

// const baseUrl = `${configApp.baseUrl}/evaluation`
const baseUrl = `${configApp.baseUrl}/inscription`

const findAll = async () => {
  try {
    const headers = await getHeaders()

    const res = await axios.get(baseUrl + '/data', { headers })

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

    const res = await axios.get(`${baseUrl}/filter?${serialize(params)}`, { headers })

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

    const res = await axios.put(`${baseUrl}/${id}`, data, { headers })

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

const compress = async (data) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(`${baseUrl}/compress`, data, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const calification = async (data) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(`${baseUrl}/setevaluation`, data, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const addRegionalWinner = async (data) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(`${baseUrl}/setwinnerdep`, data, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const addNacionalWinner = async (data) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(`${baseUrl}/setwinnerall`, data, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const listRegionalWinners = async (criteria = []) => {
  const params = {}
  params.criteria = criteria

  try {
    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}/listwinnerdep?${serialize(params)}`, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const evaluationApi = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  compress,
  calification,
  addRegionalWinner,
  addNacionalWinner,
  listRegionalWinners
}

export default evaluationApi

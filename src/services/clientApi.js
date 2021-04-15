
import apiService from 'services/apiService'

import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/client`

const findAll = async () => {

  try {

    return await apiService.get('/client/combobox')
  } catch (error) {

    throw error
  }
}

const findBy = async (criteria = [], orderBy = false, limit = false, offset = false) => {

  try {

    const params = {
      criteria
    }

    if (orderBy) params.orderBy = orderBy
    if (limit) params.limit = limit
    if (offset) params.offset = offset

    return await apiService.get(`/client?${serialize(params)}`)
  } catch (err) {
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

    return await apiService.post('/client', data)
  } catch (err) {
  }
}

const update = async (id, data) => {

  try {

    return await apiService.put(`/client/${id}`, data)
  } catch (err) {
  }
}

const updatePassword = async (id, data) => {

  try {

    return await apiService.post(`/client/${id}/changepassword`, data)
  } catch (err) {
  }
}

const remove = async (id) => {

  try {

    return await apiService.del(`/client/${id}`)
  } catch (err) {
  }
}

const userApi = {
  findAll,
  findBy,
  // find,
  create,
  update,
  updatePassword,
  remove,
}

export default userApi

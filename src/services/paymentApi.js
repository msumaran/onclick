
import apiService from 'services/apiService'

import axios from 'axios'
// import mockAdapter from 'axios-mock-adapter'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/payment`

const findAll = async () => {

  try {

    return await apiService.get('/payment/combobox')
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

    return await apiService.post(`/payment?${serialize(params)}`)
  } catch (error) {

    throw error
  }
}

const find = async (id) => {

  try {

    return await apiService.get(`/payment/${id}`)
  } catch (error) {

    throw error
  }
}

const create = async (data) => {

  try {

    return await apiService.post('/payment', data)
  } catch (error) {

    throw error
  }
}

const update = async (id, data) => {

  try {

    return await apiService.put(`/payment/${id}`, data)
  } catch (error) {

    throw error
  }
}

const updatePassword = async (id, data) => {

  try {

    return await apiService.put(`/payment/${id}/changepassword`, data)
  } catch (error) {

    throw error
  }
}

const remove = async (id) => {

  try {

    return await apiService.del(`/payment/${id}`)
  } catch (error) {

    throw error
  }
}

const findByUserId = async (id) => {

  try {

    return await apiService.get(`/payment/user/${id}`)
  } catch (error) {

    throw error
  }
}

const paymentApi = {
  findAll,
  findBy,
  find,
  create,
  update,
  updatePassword,
  remove,
  findByUserId,
}

export default paymentApi

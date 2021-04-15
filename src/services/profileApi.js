
import apiService from 'services/apiService'

import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { serialize } from 'helpers/utils'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}/profile`

const findAll = async () => {

  try {

    return await apiService.get('/profile/combobox')
  } catch (error) {

    throw error
  }
}

const findBy = async (criteria = [], orderBy = false, limit = false, offset = false) => {

  const params = {
    criteria
  }

  if (orderBy) params.orderBy = orderBy
  if (limit) params.limit = limit
  if (offset) params.offset = offset

  try {

    return await apiService.get(`/profile?${serialize(params)}`)
  } catch (error) {

    throw error
  }
}

const find = async (id) => {

  try {

    return await apiService.get(`/profile/${id}`)
  } catch (error) {

    throw error
  }
}

const create = async (data) => {

  try {

    return await apiService.post('/profile', data)
  } catch (error) {

    throw error
  }
}

const update = async (id, data) => {

  try {

    return await apiService.put(`/profile/${id}/setpermission`, data)
  } catch (error) {

    throw error
  }
}

const remove = async (id) => {

  try {

    return await apiService.del(`/profile/${id}`)
  } catch (error) {

    throw error
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

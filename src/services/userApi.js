
import apiService from 'services/apiService'

import { serialize } from 'helpers/utils'

const findAll = async () => {

  try {

    return await apiService.get('/user/combobox')
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

    return await apiService.get(`/user?${serialize(params)}`)
  } catch (error) {

    throw error
  }
}

const find = async (id) => {

  try {

    return await apiService.get(`/user/${id}`)
  } catch (error) {

    throw error
  }
}

const create = async (data) => {

  try {

    return await apiService.post('/user', data)
  } catch (error) {

    throw error
  }
}

const update = async (id, data) => {

  try {

    return await apiService.put(`/user/${id}`, data)
  } catch (error) {

    throw error
  }
}

const updatePassword = async (id, data) => {

  try {

    return await apiService.put(`/user/${id}/changepassword`, data)
  } catch (error) {

    throw error
  }
}

const remove = async (id) => {

  try {

    return apiService.del(`/user/${id}`)
  } catch (error) {

    throw error
  }
}

const active = async (id) => {

  try {

    return apiService.put(`/user/active/${id}`)
  } catch (error) {

    throw error
  }
}

const userApi = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  updatePassword,
  active,
}

export default userApi

import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp, toastDefaults } from 'helpers/config'

import profileApi from 'services/profileApi'

const findAll = () => {

  return async (dispatch) => {

    try {

      const res = await profileApi.findAll()

      dispatch({
        type: 'PROFILE_FIND_ALL',
        payload: res.content
      })

      return res.code

    } catch (err) {
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await profileApi.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'PROFILE_FIND_BY',
        payload: res.content
      })

      return res.code
    } catch (err) {
    }
  }
}

const find = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PROFILE_FIND',
        payload: id
      })
    } catch (err) {
    }
  }
}

const create = (data) => {
  return async (dispatch) => {
    try {
      const res = await profileApi.create(data)

      dispatch({
        type: 'PROFILE_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
    }
  }
}

const update = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await profileApi.update(id, data)

      dispatch({
        type: 'PROFILE_UPDATE',
        payload: res.content
      })

      toast.success(res.message, toastDefaults)

      return res.code
    } catch (err) {
    }
  }
}

const remove = (id) => {

  return async (dispatch) => {

    try {

      const res = await profileApi.remove(id)

      dispatch({
        type: 'PROFILE_REMOVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {

    }
  }
}

const profileAction = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove
}

export default profileAction

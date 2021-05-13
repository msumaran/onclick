import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp, toastDefaults } from 'helpers/config'

import userApi from 'services/userApi'

const findAll = () => {

  return async (dispatch) => {

    try {

      const data = await userApi.findAll()

      dispatch({
        type: 'USER_FIND_ALL',
        payload: data.content
      })
    } catch (err) {
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {

  return async (dispatch) => {

    try {

      const data = await userApi.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'USER_FIND_BY',
        payload: data.content
      })
    } catch (err) {
    }
  }
}

const find = (id) => {

  return {
    type: 'USER_FIND',
    payload: id
  }
}

const create = (data) => {

  return async (dispatch) => {

    try {

      const res = await userApi.create(data)

      dispatch({
        type: 'USER_CREATE',
        payload: res.content
      })

      toast.success(res.message, toastDefaults)

      return res.code
    } catch (err) {
    }
  }
}

const update = (id, data) => {

  return async (dispatch) => {

    try {

      const res = await userApi.update(id, data)

      dispatch({
        type: 'USER_UPDATE',
        payload: res.content
      })

      toast.success(res.message, toastDefaults)

      return res.code
    } catch (err) {
    }
  }
}

const changePassword = (id, data) => {

  return async (dispatch) => {

    try {

      const res = await userApi.updatePassword(id, data)

      dispatch({
        type: 'USER_UPDATE_PASSWORD',
        payload: res.content
      })

      toast.success(res.message, toastDefaults)
    } catch (err) {
    }
  }
}

const remove = (id) => {
  return async (dispatch) => {
    try {
      const res = await userApi.remove(id)

      dispatch({
        type: 'USER_REMOVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.remove', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const active = (id) => {
  return async (dispatch) => {
    try {
      const res = await userApi.active(id)

      dispatch({
        type: 'USER_ACTIVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.active', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const userAction = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  changePassword,
  active,
}

export default userAction

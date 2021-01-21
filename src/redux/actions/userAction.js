import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/userApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'USER_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.findAll', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      if (configApp.env === 'dev') console.log('userAction.findBy', res)

      dispatch({
        type: 'USER_FIND_BY',
        payload: res.content
      })
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.findBy', err)

      handleCatchNotify(err)
    }
  }
}

const find = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'USER_FIND',
        payload: id
      })
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.find', err)

      handleCatchNotify(err)
    }
  }
}

const create = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.create(data)

      dispatch({
        type: 'USER_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.create', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const update = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api.update(id, data)

      dispatch({
        type: 'USER_UPDATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.update', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const changePassword = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api.updatePassword(id, data)

      dispatch({
        type: 'USER_UPDATE_PASSWORD',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.updatePassword', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const editRegions = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.editRegions(data)

      dispatch({
        type: 'USER_EDIT_REGIONS',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('userAction.editRegions', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const remove = (id) => {
  return async (dispatch) => {
    try {
      const res = await api.remove(id)

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

const userAction = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  changePassword,
  editRegions
}

export default userAction

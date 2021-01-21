import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/profileApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'PROFILE_FIND_ALL',
        payload: res.content
      })

      return res.code
      
    } catch (err) {
      if (configApp.env === 'dev') console.log('profileAction.findAll', err)

      handleCatchNotify(err)
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'PROFILE_FIND_BY',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('profileAction.findBy', err)

      handleCatchNotify(err)
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
      if (configApp.env === 'dev') console.log('profileAction.find', err)

      handleCatchNotify(err)
    }
  }
}

const create = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.create(data)

      dispatch({
        type: 'PROFILE_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('profileAction.create', err)

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
        type: 'PROFILE_UPDATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('profileAction.update', err)

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
        type: 'PROFILE_REMOVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('profileAction.remove', err)

      handleCatchNotify(err)

      return err.code
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

import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/packApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'PACK_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.findAll', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}
  
const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      if (configApp.env === 'dev') console.log('packAction.findBy', res)

      dispatch({
        type: 'PACK_FIND_BY',
        payload: res.content
      })
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.findBy', err)

      handleCatchNotify(err)
    }
  }
}

const find = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PACK_FIND',
        payload: id
      })
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.find', err)

      handleCatchNotify(err)
    }
  }
}

const create = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.create(data)

      dispatch({
        type: 'PACK_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.create', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const update = (id, data) => {
  return async (dispatch) => {
    try {
      console.log("data: ", data);

      const res = await api.update(id, data)

      dispatch({
        type: 'PACK_UPDATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.update', err)

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
        type: 'PACK_UPDATE_PASSWORD',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.updatePassword', err)

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
        type: 'PACK_EDIT_REGIONS',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.editRegions', err)

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
        type: 'PACK_REMOVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('packAction.remove', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const packAction = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  changePassword,
  editRegions
}

export default packAction

import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import clientApi from 'services/clientApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await clientApi.findAll()

      dispatch({
        type: 'CLIENT_FIND_ALL',
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

      const res = await clientApi.findBy(criteria, orderBy, limit, offset)

      if (configApp.env === 'dev') console.log('clientAction.findBy', res)

      dispatch({
        type: 'CLIENT_FIND_BY',
        payload: res.content
      })
    } catch (error) {

      throw error
    }
  }
}

const find = (id) => {

  return async (dispatch) => {

    try {

      dispatch({
        type: 'CLIENT_FIND',
        payload: id
      })
    } catch (error) {

      throw error
    }
  }
}

const create = (data) => {

  return async (dispatch) => {

    try {

      const res = await clientApi.create(data)

      dispatch({
        type: 'CLIENT_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const update = (id, data) => {

  return async (dispatch) => {

    try {

      const res = await clientApi.update(id, data)

      dispatch({
        type: 'CLIENT_UPDATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const changePassword = (id, data) => {

  return async (dispatch) => {

    try {

      const res = await clientApi.updatePassword(id, data)

      dispatch({
        type: 'CLIENT_UPDATE_PASSWORD',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const editRegions = (data) => {

  return async (dispatch) => {

    try {

      const res = await clientApi.editRegions(data)

      dispatch({
        type: 'CLIENT_EDIT_REGIONS',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const remove = (id) => {

  return async (dispatch) => {

    try {

      const res = await clientApi.remove(id)

      dispatch({
        type: 'CLIENT_REMOVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const active = (id) => {
  return async (dispatch) => {
    try {
      const res = await clientApi.active(id)

      dispatch({
        type: 'CLIENT_ACTIVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('clientAction.active', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const clientAction = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  changePassword,
  editRegions,
  active
}

export default clientAction

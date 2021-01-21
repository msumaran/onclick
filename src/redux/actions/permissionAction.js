import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/permissionApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'PERMISSION_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('permissionAction.findAll', err)

      handleCatchNotify(err)
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'PERMISSION_FIND_BY',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('permissionAction.findBy', err)

      handleCatchNotify(err)
    }
  }
}

const permissionAction = {
  findAll,
  findBy
}

export default permissionAction

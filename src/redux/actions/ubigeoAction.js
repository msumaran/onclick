import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/ubigeoApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'))
      const departmentList = session.departmentsList
      const userProfile = session.profileId

      // userProfile 1 = admin
      if (departmentList.length === 0 || userProfile === 1) {
        const res = await api.findAll()

        dispatch({
          type: 'UBIGEO_FIND_ALL',
          payload: res.content
        })

        return res.code
      } else {
        dispatch({
          type: 'UBIGEO_FIND_ALL',
          payload: departmentList
        })

        return 200
      }
    } catch (err) {
      if (configApp.env === 'dev') console.log('ubigeoAction.findAll', err)

      handleCatchNotify(err)
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'UBIGEO_FIND_BY',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('ubigeoAction.findBy', err)

      handleCatchNotify(err)
    }
  }
}

const findBySegment = () => {
  return async (dispatch) => {
    try {
      const res = await api.findBySegment()

      dispatch({
        type: 'UBIGEO_FIND_BY_SEGMENT',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('ubigeoAction.findBySegment', err)

      handleCatchNotify(err)
    }
  }
}

const ubigeoAction = {
  findAll,
  findBy,
  findBySegment
}

export default ubigeoAction

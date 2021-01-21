import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/dashboardApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'DASHBOARD_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('dashboardAction.findAll', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const dashboardAction = {
  findAll
}

export default dashboardAction

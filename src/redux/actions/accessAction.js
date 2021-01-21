import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/accessApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'ACCESS_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('accessAction.findAll', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const accessAction = {
  findAll
}

export default accessAction

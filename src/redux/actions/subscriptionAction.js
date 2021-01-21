import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/subscriptionApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'SUBSCRIPTION_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('subscriptionAction.findAll', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const subscriptionAction = {
  findAll
}

export default subscriptionAction

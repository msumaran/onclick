import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/reportApi'

const make = (type, params = false) => {
  return async (dispatch) => {
    try {
      const res = await api.make(type, params)

      return res.content
    } catch (err) {
      if (configApp.env === 'dev') console.log('reportAction.make', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const reportAction = {
  make
}

export default reportAction

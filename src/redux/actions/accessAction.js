
import accessApi from 'services/accessApi'

const findAll = () => {

  return async (dispatch) => {

    try {

      const res = await accessApi.findAll()

      dispatch({
        type: 'ACCESS_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const accessAction = {
  findAll
}

export default accessAction

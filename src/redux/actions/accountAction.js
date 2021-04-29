import { toast } from 'react-toastify'

import accountApi from 'services/accountApi'

import { toastDefaults } from 'helpers/config'

const login = (username, password) => {

  return async (dispatch) => {

    try {

      const res = await accountApi.login(username, password)

      dispatch({
        type: 'ACCOUNT_LOGIN',
        payload: res
      })

      // window.location.replace(window.location.pathname)
      window.location.replace( `${process.env.PUBLIC_URL}` )

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const logout = () => {

  return (dispatch) => {

    accountApi.logout()

    dispatch({
      type: 'ACCOUNT_LOGOUT'
    })

    window.location.reload()
  }
}

const selfChangePassword = (password) => {
  return async (dispatch) => {
    try {
      const res = await accountApi.selfChangePassword(password)

      dispatch({
        type: 'ACCOUNT_CHANGE_PASSWORD',
        payload: res.content
      })

      toast.success(res.message, toastDefaults)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const recoveryAccount = (username) => {
  return async (dispatch) => {
    try {
      const res = await accountApi.recoveryAccount(username)

      dispatch({
        type: 'ACCOUNT_RECOVERY',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (error) {

      throw error
    }
  }
}

const getPermissions = () => {

  return async (dispatch) => {

    try {

      const res = await accountApi.getPermissions()

      dispatch({
        type: 'SET_MY_PERMISSIONS',
        payload: res.content.permissions
      })
    } catch (error) {

      throw error
    }
  }
}

const accountAction = {
  login,
  logout,
  selfChangePassword,
  getPermissions,
  recoveryAccount
}

export default accountAction

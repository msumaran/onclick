
import apiService from 'services/apiService'

const login = async (username, password) => {

  try {

    const data = await apiService.post('/login_check', { username, password })

    const showTutorial = data.profileId === 1 ? false : !data.tutorial;

    localStorage.setItem('session', JSON.stringify({
      name: data.name,
      profileId: data.profileId,
      token: data.token,
      tutorial: showTutorial,
    }))

    return data
  } catch (error) {

    throw error
  }
}

const logout = () => {

  localStorage.removeItem('session')
}

const selfChangePassword = async (password) => {

  try {

    const data = await apiService.put('/user/self-change-password', { password })

    return data
  } catch (error) {

    throw error
  }
}

const selfChangeTutorial = async () => {

  try {

    const data = await apiService.put('/user/self-change-tutorial', { })

    return data
  } catch (error) {

    throw error
  }
}

const getPermissions = async () => {

  try {

    const data = await apiService.get('/account')

    return data
  } catch (error) {

  }
}

const recoveryAccount = async (username) => {

  try {

    const data = await apiService.postOut('/ajax/user/recovery-account', { username })

    return data
  } catch (error) {

    throw error
  }
}

export default {
  login,
  logout,
  selfChangePassword,
  getPermissions,
  recoveryAccount,
  selfChangeTutorial,
}

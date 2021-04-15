
import apiService from './apiService'

const findAll = async () => {

  try {

    return await apiService.get('/access/combobox')
  } catch (error) {

    throw error
  }
}

const accessApi = {
  findAll,
}

export default accessApi

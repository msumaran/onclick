
import apiService from 'services/apiService'

export const findAll = async () => {

    try {

        return await apiService.get('/my-payments/combobox')
    } catch (error) {

    }
}

export const create = async (data) => {

    try {

        return await apiService.post('/my-payments', data)
    } catch (error) {

        // handleError(error)
    }
}

export default {
    findAll,
    create,
}

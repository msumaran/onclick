import apiService from './apiService'

export const findAll = async () => {

    try {

        const data = await apiService.get('/my-contacts/combobox')

        return data
    } catch (error) {

    }
}

export default {
    findAll,
}

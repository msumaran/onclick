
import apiService from 'services/apiService'

const getMyLanding = async () => {

    try {

        return await apiService.get('/my-landing')
    } catch (error) {

        throw error
    }
}

const validateSlug = async (landingId, slug) => {

    try {

        return await apiService.get(`/my-landing/validateslug?id=${landingId}&slug=${slug}`)
    } catch (error) {

        throw error
    }
}

const saveMyLanding = async (data) => {

    try {

        const res = await apiService.put('/my-landing', data)

        return res
    } catch (error) {

        throw error
    }
}

export default {
    getMyLanding,
    validateSlug,
    saveMyLanding,
}


import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { Log } from 'helpers/DebugHelper'

import api from 'services/myContactsApi'

export const findAll = () => {

    return async (dispatch) => {

        try {

            const data = await api.findAll()

            dispatch({
                type: 'MY_CONTACTS_FIND_ALL',
                payload: data.content
            })
        } catch (error) {

            Log('myContactsActions.findAll', error.message)

            handleCatchNotify(error)
        }
    }
}
export default {
    findAll,
}

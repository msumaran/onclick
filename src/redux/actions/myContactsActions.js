
import { handleCatchNotify } from 'helpers/api'
import { Log } from 'helpers/DebugHelper'

import myContactsApi from 'services/myContactsApi'


export const findAll = (reloading = false) => {

    return async (dispatch) => {

        if (reloading) {

            dispatch({
                type: 'MY_CONTACTS_RELOAD_ALL',
            })
        } else {

            dispatch({
                type: 'MY_CONTACTS_FIND_ALL_START',
            })
        }

        try {

            const data = await myContactsApi.findAll()

            dispatch({
                type: 'MY_CONTACTS_FIND_ALL_END',
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

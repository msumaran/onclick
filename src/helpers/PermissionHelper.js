/*eslint array-callback-return: "off" */

import { Log } from '../helpers/DebugHelper'

class PermissionHelper {

    my_permissions

    constructor(permissions) {

        this.my_permissions = permissions
    }

    validate(module, permission_necesary) {

        Log('Looking for permission', module, permission_necesary)

        let has_permission = false
        let section = ''
        let permission = permission_necesary.split('')

        try {

            for (var i = 0; i < this.my_permissions.length; i++) {

                if (this.my_permissions[i].module === module) {

                    section = this.my_permissions[i].section.split()
                    break
                }
            }

            if (section.length === 1) {

                section[0].split('').map(function (s) {

                    if (permission.includes(s)) {

                        has_permission = true
                    }
                })
            }
        } catch (error) {

            Log('PermissionHelper.validate', error.message)
        }
        return has_permission
    }
}

export default PermissionHelper

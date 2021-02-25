/*eslint array-callback-return: "off" */

import { Log } from '../helpers/DebugHelper'

class PermissionHelper {

    my_permissions

    constructor(permissions) {

        this.my_permissions = permissions
    }

    validate(the_module, permission_necesary) {

        let has_permission = false
        const permissions_needed = permission_necesary.split('')

        const my_modules = this.my_permissions.filter((my_permission) => my_permission.module === the_module)

        const my_module = my_modules.length ? my_modules[0] : undefined

        if (!my_module) {

            Log('No module permissions found', the_module, permission_necesary, this.my_permissions)

            return false
        }

        permissions_needed.map((permission_needed) => {

            if (my_module.section.includes(permission_needed)) {

                has_permission = true
            }
        })

        return has_permission
    }
}

export default PermissionHelper

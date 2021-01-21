const PermssionHelper = (nameMachine, permissionNecesary = '') => {
  const session = JSON.parse(localStorage.getItem('session'))
  const permissions = session.permissions

  let status = false
  let section = ''
  let permission = permissionNecesary.split('')

  for (var i = 0; i < permissions.length; i++) {
    if (permissions[i].module === nameMachine) {
      section = permissions[i].section.split()
      break
    }
  }

  if (section.length === 1) {
    section[0].split('').map(function (s) {
      if (permission.includes(s)) {
        status = true
      }
    })
  }
  return status
}

export { PermssionHelper }

const Navigation = () => {
  const allItems = [
    {
      name: 'Tablero',
      url: '/dashboard',
      icon: 'icon-speedometer',
      nameMachine: 'dashboard'
    },

    {
      name: 'Seguridad',
      url: '/security',
      icon: 'icon-lock',
      nameMachine: 'security',
      children: [
        {
          name: 'Usuarios',
          url: '/security/users',
          icon: 'icon-people',
          nameMachine: 'user'
        },
        {
          name: 'Perfiles',
          url: '/security/profiles',
          icon: 'cil-fingerprint',
          nameMachine: 'profile'
        },
        {
          name: 'Accesos',
          url: '/security/access',
          icon: 'icon-directions',
          nameMachine: 'access'
        }
      ]
    },
    {
      name: 'Participantes',
      url: '/participant',
      icon: 'icon-note',
      nameMachine: 'participant'
    },
    {
      name: 'Suscripciones',
      url: '/subscription',
      icon: 'icon-envelope-open',
      nameMachine: 'subscription'
    },

    {
      name: 'Reportes',
      url: '/report',
      icon: 'icon-chart',
      nameMachine: 'report'
    }
  ]

  const dataUser = JSON.parse(localStorage.getItem('session'))
  const permissions = dataUser.permissions;
  let modules = [];
  let items = [];

  permissions.map((p)=>{ modules.push(p.module) })

  allItems.map(( menu )=>{
    if( modules.includes( menu.nameMachine ) || menu.nameMachine === 'dashboard' ){
      if( menu.hasOwnProperty('children') ){
        let tmpMenu = menu;
        tmpMenu.childrenTmp = [];
        menu.children.map((smenu)=>{
          if( modules.includes( smenu.nameMachine ) ){
            tmpMenu.childrenTmp.push(smenu)
          }
        })
        tmpMenu.children = tmpMenu.childrenTmp;
        items.push(tmpMenu);
      }else{
        items.push(menu);
      }
    }    
  })

  return { items };
}

export { Navigation };

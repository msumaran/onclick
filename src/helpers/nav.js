
const Navigation = (permissions) => {

  const allItems = [
    {
      name: 'Tablero',
      url: '/dashboard',
      icon: 'icon-speedometer',
      nameMachine: 'dashboard'
    },
    {
      name: 'Admin Clientes',
      url: '/client',
      icon: 'icon-speedometer',
      nameMachine: 'client'
    },
    {
      name: 'Admin Pagos',
      url: '/payment',
      icon: 'icon-speedometer',
      nameMachine: 'payment'
    },

    {
      name: 'Cliente Contactos',
      url: '/contact',
      icon: 'icon-speedometer',
      nameMachine: 'contact'
    },
    {
      name: 'Cliente Pagos',
      url: '/my-payments',
      icon: 'icon-speedometer',
      nameMachine: 'user_payments'
    },
    {
      name: 'Cliente Editor',
      url: '/landing',
      icon: 'icon-speedometer',
      nameMachine: 'landing'
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
      name: 'Reportes',
      url: '/report',
      icon: 'icon-chart',
      nameMachine: 'report'
    }
  ]

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

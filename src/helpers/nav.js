/*eslint array-callback-return: "off" */

const Navigation = (permissions) => {

  const allItems = [
    {
      name: 'Tablero',
      url: '/dashboard',
      icon: 'oc oc-dashboard',
      nameMachine: 'dashboard'
    },
    {
      name: 'Activaciones',
      url: '/activations',
      icon: 'oc oc-users',
      nameMachine: 'page_activation'
    },
    {
      name: 'Consultas',
      url: '/inquiries',
      icon: 'oc oc-users',
      nameMachine: 'page_contact'
    },
    {
      name: 'Admin Clientes',
      url: '/client',
      icon: 'oc oc-clients',
      nameMachine: 'client'
    },
    {
      name: 'Admin Pagos',
      url: '/payment',
      icon: 'oc oc-payments',
      nameMachine: 'payment'
    },

    {
      name: 'Gestor de Leads',
      url: '/my-contacts',
      icon: 'oc oc-leads',
      nameMachine: 'my_contacts'
    },
    {
      name: 'Mis pagos',
      url: '/my-payments',
      icon: 'oc oc-payments',
      nameMachine: 'my_payments'
    },
    {
      name: 'Editor de landing',
      url: '/my-landing',
      icon: 'oc oc-editor',
      nameMachine: 'landing'
    },
    // {
    //   name: 'Mi kanban',
    //   url: '/my-kanban',
    //   icon: 'icon-speedometer',
    //   nameMachine: 'landing'
    // },

    {
      name: 'Seguridad',
      url: '/security',
      icon: 'oc oc-security',
      nameMachine: 'security',
      children: [
        {
          name: 'Usuarios',
          url: '/security/users',
          icon: 'oc oc-users',
          nameMachine: 'user'
        },
        {
          name: 'Perfiles',
          url: '/security/profiles',
          icon: 'oc oc-profiles',
          nameMachine: 'profile'
        },
        {
          name: 'Accesos',
          url: '/security/access',
          icon: 'oc oc-access',
          nameMachine: 'access'
        }
      ]
    },
    {
      name: 'Feedback',
      url: '/feedback',
      icon: 'oc oc-feedback',
      nameMachine: 'feedback'
    },
    {
      name: 'Reportes',
      url: '/report',
      icon: 'oc oc-reports',
      nameMachine: 'report'
    }
  ]

  let modules = [];
  let items = [];

  permissions.map((p)=> modules.push(p.module))

  allItems.map((menu) => {

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

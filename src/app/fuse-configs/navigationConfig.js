import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'admin-home-component',
		title: 'homeAdmin',
		translate: 'Admin dashboard',
		type: 'item',
		icon: 'whatshot',
		url: '/admin-dashboard',
		auth: ['admin']
	},
	{
		id: 'users-component',
		title: 'users',
		translate: 'Admin Usuarios',
		type: 'item',
		icon: 'whatshot',
		url: '/admin-users',
		auth: ['admin']
	},
	{
		id: 'payments-component',
		title: 'payments',
		translate: 'Admin Pagos',
		type: 'item',
		icon: 'whatshot',
		url: '/admin-payments',
		auth: ['admin']
	},
	{
		id: 'home-component',
		title: 'home',
		translate: 'Dashboard',
		type: 'item',
		icon: 'whatshot',
		url: '/dashboard',
		auth: ['user', 'admin']
	},
	{
		id: 'contacts-component',
		title: 'Contactos',
		translate: 'Contactos',
		type: 'item',
		icon: 'whatshot',
		url: '/user-contacts',
		auth: ['user', 'admin']
	},
	{
		id: 'forms-component',
		title: 'Contactos',
		translate: 'Formularios',
		type: 'item',
		icon: 'whatshot',
		url: '/user-forms',
		auth: ['user', 'admin']
	},
	{
		id: 'editor-component',
		title: 'Editor',
		translate: 'Editor',
		type: 'item',
		icon: 'whatshot',
		url: '/editor',
		auth: ['user', 'admin']
		// target: '_blank'
	},
	{
		id: 'example-component',
		title: 'Landing',
		translate: 'Landing',
		type: 'link',
		icon: 'whatshot',
		url: '/example',
		auth: ['user', 'admin']
		// target: '_blank'
	}
];

export default navigationConfig;

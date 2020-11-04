import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'home-component',
		title: 'home',
		translate: 'Admin Home',
		type: 'item',
		icon: 'whatshot',
		url: '/admin-home'
	},
	{
		id: 'users-component',
		title: 'users',
		translate: 'Admin Usuarios',
		type: 'item',
		icon: 'whatshot',
		url: '/admin-users'
	},
	{
		id: 'payments-component',
		title: 'payments',
		translate: 'Admin Pagos',
		type: 'item',
		icon: 'whatshot',
		url: '/admin-payments'
	},
	{
		id: 'home-component',
		title: 'home',
		translate: 'User Home',
		type: 'item',
		icon: 'whatshot',
		url: '/home'
	},
	{
		id: 'contacts-component',
		title: 'Contactos',
		translate: 'User Contactos',
		type: 'item',
		icon: 'whatshot',
		url: '/user-contacts'
	},
	// {
	// 	id: 'tags-component',
	// 	title: 'Etiquetas',
	// 	translate: 'Etiquetas',
	// 	type: 'item',
	// 	icon: 'whatshot',
	// 	url: '/tags'
	// },
	{
		id: 'editor-component',
		title: 'Editor',
		translate: 'Editor',
		type: 'item',
		icon: 'whatshot',
		url: '/editor',
		// target: '_blank'
	},
	{
		id: 'example-component',
		title: 'Landing',
		translate: 'Landing',
		type: 'link',
		icon: 'whatshot',
		url: '/example',
		// target: '_blank'
	},
	// {
	// 	id: 'asistencia',
	// 	title: 'Marcar Asistencia',
	// 	translate: 'Marcar Asistencia',
	// 	type: 'item',
	// 	icon: 'avtimer',
	// 	url: '/scrumboard'
	// }
];

export default navigationConfig;

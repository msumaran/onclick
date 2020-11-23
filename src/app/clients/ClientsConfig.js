// import i18next from 'i18next';
import Clients from './Clients';
// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'app/auth';

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const ClientsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin, 
	routes: [
		{
			path: '/admin-clients',
			component: Clients
		}
	]
};

export default ClientsConfig;

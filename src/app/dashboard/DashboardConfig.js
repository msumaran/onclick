import Dashboard from './Dashboard'; 

import { authRoles } from 'app/auth';

const DashboardConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin, 
	routes: [
		{
			path: '/dashboard',
			component: Dashboard
		}
	]
};

export default DashboardConfig;

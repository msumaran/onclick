import Dashboard from './Dashboard'; 

import { authRoles } from 'app/auth';

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

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

/**
 * Lazy load Example
 */
/*
import React from 'react';

const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default DashboardConfig;

*/

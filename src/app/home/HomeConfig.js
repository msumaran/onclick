import i18next from 'i18next';
import Home from './Home';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const HomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user, 
	routes: [
		{
			path: '/home',
			component: Home
		}
	]
};

export default HomeConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const HomeConfig = {
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

export default HomeConfig;

*/

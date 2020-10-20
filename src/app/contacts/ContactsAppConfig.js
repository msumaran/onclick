import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/contacts/:id',
			component: React.lazy(() => import('./ContactsApp'))
		},
		{
			path: '/contacts',
			component: () => <Redirect to="/contacts/all" />
		}
	]
};

export default ContactsAppConfig;

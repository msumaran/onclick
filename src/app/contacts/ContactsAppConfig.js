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
			path: '/user-contacts/:id',
			component: React.lazy(() => import('./ContactsApp'))
		},
		{
			path: '/user-contacts',
			component: () => <Redirect to="/user-contacts/all" />
		}
	]
};

export default ContactsAppConfig;

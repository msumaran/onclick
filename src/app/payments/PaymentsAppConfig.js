import React from 'react';
import { Redirect } from 'react-router-dom';

const PaymentsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/user-payments/:id',
			component: React.lazy(() => import('./PaymentsApp'))
		},
		{
			path: '/user-payments',
			component: () => <Redirect to="/user-payments/all" />
		}
	]
};

export default PaymentsAppConfig;

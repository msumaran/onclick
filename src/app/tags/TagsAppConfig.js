import React from 'react';
import { Redirect } from 'react-router-dom';

const TagsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/tags/:id',
			component: React.lazy(() => import('./TagsApp'))
		},
		{
			path: '/tags',
			component: () => <Redirect to="/tags/all" />
		}
	]
};

export default TagsAppConfig;

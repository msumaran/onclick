import React from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/scrumboard/boards/:boardId/:boardUri?',
			component: React.lazy(() => import('./board/Board'))
		},
		{
			path: '/scrumboard/boards',
			component: React.lazy(() => import('./boards/Boards'))
		},
		{
			path: '/scrumboard',
			component: () => <Redirect to="/scrumboard/boards" />
		}
	]
};

export default ScrumboardAppConfig;

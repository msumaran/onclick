import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';

import LoginConfig from 'app/login/LoginConfig';
import RegisterConfig from 'app/register/RegisterConfig';

import DashboardConfigAdmin from 'app/admin/dashboard/DashboardConfig';

import DashboardConfig from 'app/dashboard/DashboardConfig';
import ContactsAppConfig from 'app/contacts/ContactsAppConfig';
import EditorPageConfig from 'app/pages/EditorPage/EditorPageConfig';
import ExampleConfig from 'app/main/example/ExampleConfig';

import HomeConfig from 'app/home/HomeConfig';

import ClientsConfig from 'app/clients/ClientsConfig';
import PaylogsConfig from 'app/paylogs/PaylogsConfig';
// import TagsAppConfig from 'app/tags/TagsAppConfig';
// import ScrumboardAppConfig from 'app/scrumboard/ScrumboardAppConfig';
// import ProfilePageConfig from 'app/profile/ProfilePageConfig';

const routeConfigs = [
	// GENERAL
	LoginConfig,
	RegisterConfig,

	// ADMIN
	DashboardConfigAdmin, // falta USUAURIOS/PAGOS
	ClientsConfig,
	PaylogsConfig,

	// USER
	DashboardConfig,
	ContactsAppConfig,
		// FORMULARIOS
	EditorPageConfig,
	ExampleConfig, 

	
	// DEFAULT
	HomeConfig, 

	// TagsAppConfig,
	// ProfilePageConfig,
	// ScrumboardAppConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/home" />
	}
];

export default routes;

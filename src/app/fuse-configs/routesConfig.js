import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';

import LoginConfig from 'app/login/LoginConfig';
import RegisterConfig from 'app/register/RegisterConfig';

import UsersConfig from 'app/users/UsersConfig';

import HomeConfig from 'app/home/HomeConfig';
import ContactsAppConfig from 'app/contacts/ContactsAppConfig';
import EditorPageConfig from 'app/pages/EditorPage/EditorPageConfig';
import ExampleConfig from 'app/main/example/ExampleConfig';

// import TagsAppConfig from 'app/tags/TagsAppConfig';
// import ScrumboardAppConfig from 'app/scrumboard/ScrumboardAppConfig';
// import ProfilePageConfig from 'app/profile/ProfilePageConfig';

const routeConfigs = [
	LoginConfig,
	RegisterConfig,

	UsersConfig, 

	HomeConfig, 
	ContactsAppConfig,
	EditorPageConfig,
	ExampleConfig, 

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

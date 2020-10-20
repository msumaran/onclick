import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/login/LoginConfig';
import RegisterConfig from 'app/register/RegisterConfig';
import ContactsAppConfig from 'app/contacts/ContactsAppConfig';
import ScrumboardAppConfig from 'app/scrumboard/ScrumboardAppConfig';
import ProfilePageConfig from 'app/profile/ProfilePageConfig';
import HomeConfig from 'app/home/HomeConfig';
import TagsAppConfig from 'app/tags/TagsAppConfig';

const routeConfigs = [
	ExampleConfig, 
	HomeConfig, 
	LoginConfig,
	RegisterConfig,
	ContactsAppConfig,
	TagsAppConfig,
	ProfilePageConfig,
	ScrumboardAppConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	}
];

export default routes;

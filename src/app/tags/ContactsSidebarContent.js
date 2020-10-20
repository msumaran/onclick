import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	listItem: {
		color: `${theme.palette.secondary.contrastText}!important`,
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));

function ContactsSidebarContent(props) {
	const user = useSelector(({ TagsApp }) => TagsApp.user);

	const classes = useStyles(props);

	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4 bgdark">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1 bgbody">
					<div className="p-24 flex items-center">
						<Avatar alt={user.name} src={user.avatar} />
						<Typography className="mx-12">{user.name}</Typography>
					</div>
					<Divider />
					<List>
						<ListItem
							button
							component={NavLinkAdapter}
							to="/contacts/all"
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon text-16">
								people
							</Icon>
							<ListItemText className="truncate" primary="Todos" disableTypography />
						</ListItem>
						<ListItem
							button
							component={NavLinkAdapter}
							to="/contacts/frequent"
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon text-16">
								restore
							</Icon>
							<ListItemText className="truncate" primary="Frecuentes" disableTypography />
						</ListItem>
						<ListItem
							button
							component={NavLinkAdapter}
							to="/contacts/starred"
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon text-16">
								star
							</Icon>
							<ListItemText className="truncate" primary="Favoritos" disableTypography />
						</ListItem>
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;

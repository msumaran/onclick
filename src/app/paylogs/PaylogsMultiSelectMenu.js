import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function PaylogsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const selectedPaylogIds = useSelector(({ paylogsApp }) => paylogsApp.paylogs.selectedPaylogIds);
	const userUID = useSelector(({ auth }) => auth.user.uid);

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedPaylogMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedPaylogsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedPaylogsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedPaylogMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedPaylogsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedPaylogsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							dispatch(
								// Actions.removePaylogs(selectedPaylogIds, userUID)
							);
							closeSelectedPaylogsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(
								// Actions.setPaylogsStarred(selectedPaylogIds, userUID)
							);
							closeSelectedPaylogsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(
								// Actions.setPaylogsUnstarred(selectedPaylogIds)
							);
							closeSelectedPaylogsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star_border</Icon>
						</ListItemIcon>
						<ListItemText primary="Unstarred" />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

export default PaylogsMultiSelectMenu;

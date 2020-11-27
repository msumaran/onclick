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

function PaymentsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const selectedPaymentIds = useSelector(({ paymentsApp }) => paymentsApp.payments.selectedPaymentIds);
	const userUID = useSelector(({ auth }) => auth.user.uid);

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedPaymentMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedPaymentsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedPaymentsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedPaymentMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedPaymentsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedPaymentsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							dispatch(Actions.removePayments(selectedPaymentIds, userUID));
							closeSelectedPaymentsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(Actions.setPaymentsStarred(selectedPaymentIds, userUID));
							closeSelectedPaymentsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(Actions.setPaymentsUnstarred(selectedPaymentIds));
							closeSelectedPaymentsMenu();
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

export default PaymentsMultiSelectMenu;

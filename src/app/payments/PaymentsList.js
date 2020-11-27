import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from 'react-table';
import PaymentsMultiSelectMenu from './PaymentsMultiSelectMenu';
import * as Actions from './store/actions';

import Moment from 'react-moment';
import 'moment-timezone';
Moment.globalFormat = 'D MMM YYYY';

function PaymentsList(props) {
	const dispatch = useDispatch();
	const payments = useSelector(({ paymentsApp }) => paymentsApp.payments.entities);
	const selectedPaymentIds = useSelector(({ paymentsApp }) => paymentsApp.payments.selectedPaymentIds);
	const searchText = useSelector(({ paymentsApp }) => paymentsApp.payments.searchText);
	//const user = useSelector(({ paymentsApp }) => paymentsApp.user);

	const [filteredData, setFilteredData] = useState(null);

	const userUID = useSelector(({ auth }) => auth.user.uid);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (payments) {
			setFilteredData(getFilteredArray(payments, searchText));
		}
	}, [payments, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
				¡No hay pagos!
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ReactTable
				className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
				getTrProps={(state, rowInfo, column) => {
					return {
						className: 'cursor-pointer',
						onClick: (e, handleOriginal) => {
							if (rowInfo) {
								dispatch(Actions.openEditPaymentDialog(rowInfo.original));
							}
						}
					};
				}}
				data={filteredData}
				columns={[
					// {
					// 	Header: () => (
					// 		<Checkbox
					// 			onClick={event => {
					// 				event.stopPropagation();
					// 			}}

					// 			color="primary"
					// 			onChange={event => {
					// 				return event.target.checked
					// 					? dispatch(Actions.selectAllPayments())
					// 					: dispatch(Actions.deSelectAllPayments());
					// 			}}
					// 			checked={
					// 				selectedPaymentIds.length === Object.keys(payments).length &&
					// 				selectedPaymentIds.length > 0
					// 			}
					// 			indeterminate={
					// 				selectedPaymentIds.length !== Object.keys(payments).length &&
					// 				selectedPaymentIds.length > 0
					// 			}
					// 		/>
					// 	),
					// 	accessor: '',
					// 	Cell: row => {
					// 		return (
					// 			<Checkbox
					// 				onClick={event => {
					// 					event.stopPropagation();
					// 				}}
					// 				checked={selectedPaymentIds.includes(row.value.id)}
					// 				onChange={() => dispatch(Actions.toggleInSelectedPayments(row.value.id))}
					// 			/>
					// 		);
					// 	},
					// 	className: 'justify-center',
					// 	sortable: false,
					// 	width: 64
					// },
					// {
					// 	Header: () => selectedPaymentIds.length > 0 && <PaymentsMultiSelectMenu />,
					// 	accessor: 'avatar',
					// 	Cell: row => <Avatar className="mx-8" alt={row.original.name} src={row.value} />,
					// 	className: 'justify-center',
					// 	width: 64,
					// 	sortable: false
					// },
					{
						Header: 'Nombre de paquete',
						accessor: 'pack',
						filterable: true,
						className: 'font-bold'
					},
					{
						Header: 'Precio',
						accessor: 'packPrice',
						filterable: true,
						className: 'font-bold'
					},
					{
						Header: 'Inicia',
						accessor: 'startAt',
						filterable: true,
						Cell: row => <Moment unix>{row.original.startAt}</Moment>,
						className: 'justify-left',
						sortable: false
					},
					{
						Header: 'Termina',
						accessor: 'endAt',
						filterable: true,
						Cell: row => <Moment unix>{row.original.endAt}</Moment>,
						className: 'justify-left',
						sortable: false
					},
					{
						Header: 'Creado',
						accessor: 'createdAt',
						filterable: true,
						Cell: row => <Moment unix>{row.original.createdAt}</Moment>,
						className: 'justify-left',
						sortable: false
					},
					// {
					// 	Header: '',
					// 	width: 128,
					// 	Cell: row => (
					// 		<div className="flex items-center">
					// 			<IconButton
					// 				onClick={ev => {
					// 					ev.stopPropagation();
					// 					dispatch(Actions.toggleStarredPayment(row.original.id, userUID));
					// 				}}
					// 			>
					// 				{row.original.starred && row.original.starred === true ? (
					// 					<Icon>star</Icon>
					// 				) : (
					// 					<Icon>star_border</Icon>
					// 				)}
					// 			</IconButton>
					// 			<IconButton
					// 				onClick={ev => {
					// 					ev.stopPropagation();
					// 					dispatch(Actions.removePayment(row.original.id, userUID));
					// 				}}
					// 			>
					// 				<Icon>delete</Icon>
					// 			</IconButton>
					// 		</div>
					// 	)
					// }
				]}
				defaultPageSize={10}
				noDataText="¡No hay pagos!"
			/>
		</FuseAnimate>
	);
}

export default PaymentsList;

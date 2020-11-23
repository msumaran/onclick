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

import PaylogsMultiSelectMenu from './PaylogsMultiSelectMenu';
import * as Actions from './store/actions';

function PaylogsList(props) {
	const dispatch = useDispatch();
	const paylogs = useSelector(({ paylogsApp }) => paylogsApp.paylogs.entities);
	const selectedPaylogIds = useSelector(({ paylogsApp }) => paylogsApp.paylogs.selectedPaylogIds);
	const searchText = useSelector(({ paylogsApp }) => paylogsApp.paylogs.searchText);
	//const user = useSelector(({ paylogsApp }) => paylogsApp.user);

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

		if (paylogs) {
			setFilteredData(getFilteredArray(paylogs, searchText));
		}
	}, [paylogs, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
				¡No hay datos!
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
								dispatch(Actions.openEditPaylogDialog(rowInfo.original));
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
					// 					? dispatch(Actions.selectAllPaylogs())
					// 					: dispatch(Actions.deSelectAllPaylogs());
					// 			}}
					// 			checked={
					// 				selectedPaylogIds.length === Object.keys(paylogs).length &&
					// 				selectedPaylogIds.length > 0
					// 			}
					// 			indeterminate={
					// 				selectedPaylogIds.length !== Object.keys(paylogs).length &&
					// 				selectedPaylogIds.length > 0
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
					// 				checked={selectedPaylogIds.includes(row.value.id)}
					// 				onChange={() => dispatch(Actions.toggleInSelectedPaylogs(row.value.id))}
					// 			/>
					// 		);
					// 	},
					// 	className: 'justify-center',
					// 	sortable: false,
					// 	width: 64
					// },

					// {
					// 	Header: () => selectedPaylogIds.length > 0 && <PaylogsMultiSelectMenu />,
					// 	accessor: 'avatar',
					// 	Cell: row => <Avatar className="mx-8" alt={row.original.name} src={row.value} />,
					// 	// Cell: row => <Avatar className="mx-8" alt={row.original.payId} src={row.userId} />,
					// 	className: 'justify-center',
					// 	width: 64,
					// 	sortable: false
					// },
					{
						Header: 'Pago ID',
						accessor: 'payId',
						filterable: true
					},
					{
						Header: 'Nombres',
						accessor: 'displayName',
						filterable: true,
						className: 'font-bold'
					},
					{
						Header: 'Apellidos',
						accessor: 'lastName',
						filterable: true,
						className: 'font-bold'
					},
					{
						Header: 'Precio',
						accessor: 'price',
						filterable: true
					},
					{
						Header: 'Inicia',
						accessor: 'startAt',
						filterable: true
					},
					{
						Header: 'Finaliza',
						accessor: 'endAt',
						filterable: true
					},
					// {
					// 	Header: '',
					// 	width: 128,
					// 	Cell: row => (
					// 		<div className="flex items-center">

					// 			<IconButton
					// 				onClick={ev => {
					// 					ev.stopPropagation();
					// 					dispatch(Actions.toggleStarredPaylog(row.original.id, userUID));
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
					// 					dispatch(Actions.removePaylog(row.original.id, userUID));
					// 				}}
					// 			>
					// 				<Icon>delete</Icon>
					// 			</IconButton>

					// 		</div>
					// 	)
					// }
				]}
				defaultPageSize={10}
				noDataText="¡No hay paylogs!"
			/>
		</FuseAnimate>
	);
}

export default PaylogsList;

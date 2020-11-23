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

import ClientsMultiSelectMenu from './ClientsMultiSelectMenu';
import * as Actions from './store/actions';

function ClientsList(props) {
	const dispatch = useDispatch();
	const clients = useSelector(({ clientsApp }) => clientsApp.clients.entities);
	const selectedClientIds = useSelector(({ clientsApp }) => clientsApp.clients.selectedClientIds);
	const searchText = useSelector(({ clientsApp }) => clientsApp.clients.searchText);
	//const user = useSelector(({ clientsApp }) => clientsApp.user);

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

		if (clients) {
			setFilteredData(getFilteredArray(clients, searchText));
		}
	}, [clients, searchText]);

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
								dispatch(Actions.openEditClientDialog(rowInfo.original));
							}
						}
					};
				}}
				data={filteredData}
				columns={[
					{
						Header: () => (
							<Checkbox
								onClick={event => {
									event.stopPropagation();
								}}

								color="primary"
								onChange={event => {
									return event.target.checked
										? dispatch(Actions.selectAllClients())
										: dispatch(Actions.deSelectAllClients());
								}}
								checked={
									selectedClientIds.length === Object.keys(clients).length &&
									selectedClientIds.length > 0
								}
								indeterminate={
									selectedClientIds.length !== Object.keys(clients).length &&
									selectedClientIds.length > 0
								}
							/>
						),
						accessor: '',
						Cell: row => {
							return (
								<Checkbox
									onClick={event => {
										event.stopPropagation();
									}}
									checked={selectedClientIds.includes(row.value.id)}
									onChange={() => dispatch(Actions.toggleInSelectedClients(row.value.id))}
								/>
							);
						},
						className: 'justify-center',
						sortable: false,
						width: 64
					},

					{
						Header: () => selectedClientIds.length > 0 && <ClientsMultiSelectMenu />,
						accessor: 'data',
						Cell: row => <Avatar className="mx-8" alt={row.original.data.displayName} src={row.original.data.photoURL} />,
						className: 'justify-center',
						width: 64,
						sortable: false
					},
					{
						Header: 'Email',
						accessor: 'data.email',
						filterable: true,
						className: 'font-bold'
					},
                    {
						Header: 'Nombre',
						accessor: 'data.displayName',
						filterable: true
					},
                    {
						Header: 'Apellido',
						accessor: 'data.lastName',
						filterable: true
					},
					{
						Header: 'Rol',
						accessor: 'role',
						filterable: true,
						className: 'font-bold'
					},
					// {
					// 	Header: 'Apellidos',
					// 	accessor: 'lastName',
					// 	filterable: true,
					// 	className: 'font-bold'
					// },
					// {
					// 	Header: 'Precio',
					// 	accessor: 'price',
					// 	filterable: true
					// },
					// {
					// 	Header: 'Inicia',
					// 	accessor: 'startAt',
					// 	filterable: true
					// },
					// {
					// 	Header: 'Finaliza',
					// 	accessor: 'endAt',
					// 	filterable: true
                    // },
                    
					{
						Header: '',
						width: 128,
						Cell: row => (
							<div className="flex items-center">

								<IconButton
									onClick={ev => {
										ev.stopPropagation();
										dispatch(Actions.toggleStarredClient(row.original.id, userUID));
									}}
								>
									{row.original.starred && row.original.starred === true ? (
										<Icon>star</Icon>
									) : (
										<Icon>star_border</Icon>
									)}
								</IconButton>

								<IconButton
									onClick={ev => {
										ev.stopPropagation();
										dispatch(Actions.removeClient(row.original.id, userUID));
									}}
								>
									<Icon>delete</Icon>
								</IconButton>

							</div>
						)
					}
				]}
				defaultPageSize={10}
				noDataText="¡No hay clients!"
			/>
		</FuseAnimate>
	);
}

export default ClientsList;

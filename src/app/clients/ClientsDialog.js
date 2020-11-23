import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from './store/actions';
import firebase from "firebase";

import FileUploader from "react-firebase-file-uploader";

const defaultFormState = {
    id: '',
    name: '',
    lastName: '',
    avatar: 'assets/images/avatars/profile.jpg',
    nickname: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    notes: ''
};



function ClientsDialog(props) {

    let isUploading = false;
    // let progress = 0;

    const dispatch = useDispatch();
    const clientDialog = useSelector(({ clientsApp }) => clientsApp.clients.clientDialog);
	const userUID = useSelector(({ auth }) => auth.user.uid);

    const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (clientDialog.type === 'edit' && clientDialog.data) {
            setForm({ ...clientDialog.data });
        }

        /**
         * Dialog type: 'new'
         */
        if (clientDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...clientDialog.data
            });
        }
    }, [clientDialog.data, clientDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (clientDialog.props.open) {
            initDialog();
        }
    }, [clientDialog.props.open, initDialog]);

    function closeComposeDialog() {
        return clientDialog.type === 'edit' ?
            dispatch(Actions.closeEditClientDialog()) :
            dispatch(Actions.closeNewClientDialog());
    }

    function canBeSubmitted() {
        return form.name.length > 0;
    }
    //Upload image
    function handleSubmit(event) {
        event.preventDefault();

        if (clientDialog.type === 'new') {
            dispatch(Actions.addClient(form, userUID));
        } else {
            dispatch(Actions.updateClient(form, userUID));
        }
        closeComposeDialog();
    }

    function handleRemove() {
        dispatch(Actions.removeClient(form.id, userUID));
        closeComposeDialog();
    }


    function handleUploadStart() {
        isUploading = true;
        //this.progress = 0;
        //this.setState({ isUploading: true, progress: 0 });
    }

    function handleProgress(progress) {
        //this.progress = progress;
    }

    function handleUploadError(error) {
        isUploading = false;
        console.error(error);
    };

    function handleUploadSuccess(filename) {
        form.avatar = filename;
        isUploading = false;
        //this.progress = 100;
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                setInForm('avatar', url);
            });
    };


    return (
        <Dialog
			classes={{
				paper: 'm-24'
			}}
			{...clientDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{clientDialog.type === 'new' ? 'Nuevo Cliente' : 'Editar Cliente'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="client avatar" src={form.avatar} />
				
					<label hidden = {isUploading} style={{backgroundColor: 'white', color: '#192d3e', padding:4, borderRadius: 4, cursor: 'pointer'}}>
   Cambiar imagen
					<FileUploader
					hidden
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
            </label>
					{clientDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Nombres"
							autoFocus
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20" />
						<TextField
							className="mb-24"
							label="Apellidos"
							id="lastName"
							name="lastName"
							value={form.lastName}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>
{/* 
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">star</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Nickname"
							id="nickname"
							name="nickname"
							value={form.nickname}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div> */}

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Celular"
							id="phone"
							name="phone"
							value={form.phone}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Correo"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">domain</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Empresa"
							id="company"
							name="company"
							value={form.company}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">work</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Cargo"
							id="jobTitle"
							name="jobTitle"
							value={form.jobTitle}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">cake</Icon>
						</div>
						<TextField
							className="mb-24"
							id="birthday"
							label="Cumpleaños"
							type="date"
							name="birthday"
							value={form.birthday}
							onChange={handleChange}
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">home</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Dirección"
							id="address"
							name="address"
							value={form.address}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">note</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Notas"
							id="notes"
							name="notes"
							value={form.notes}
							onChange={handleChange}
							variant="outlined"
							multiline
							rows={5}
							fullWidth
						/>
					</div>
				</DialogContent>

				{clientDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								
								Agregar
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								Guardar
							</Button>
						</div>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
    );
}

export default ClientsDialog;
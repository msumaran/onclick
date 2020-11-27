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
// import * as authActions from 'app/auth/store/actions';

import firebase from "firebase";

// import FileUploader from "react-firebase-file-uploader";

const defaultFormState = {
    // id: '',
    analitycs: '',
};

function ClientsDialogAnalitycs(props) {

    let isUploading = false;

    const dispatch = useDispatch();

    const clientDialogAnalitycs = useSelector(({ clientsApp }) => clientsApp.clients.clientDialogAnalitycs);
    
    const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (clientDialogAnalitycs.type === 'edit' && clientDialogAnalitycs.data) {
            setForm({ ...clientDialogAnalitycs.data });
        }

        /**
         * Dialog type: 'new'
         */
        if (clientDialogAnalitycs.type === 'new') {
            setForm({
                ...defaultFormState,
                ...clientDialogAnalitycs.data
            });
        }
    }, [clientDialogAnalitycs.data, clientDialogAnalitycs.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (clientDialogAnalitycs.props.open) {
            initDialog();
        }
    }, [clientDialogAnalitycs.props.open, initDialog]);

    function closeComposeDialog() {
        return clientDialogAnalitycs.type === 'edit' ?
            dispatch(Actions.closeAnalitycs()) :
            dispatch(Actions.closeNewClientDialog());
    }

    function canBeSubmitted() {
        return form.analitycs.length > 0;
	}
	
    function handleSubmit(event) {
        event.preventDefault();

        if (clientDialogAnalitycs.type === 'new') {
			// dispatch(Actions.addClient(form)); 
            dispatch( Actions.saveDialogAnalitycs(form) );
        } else {
            dispatch(Actions.updateClient(form));
        }
        closeComposeDialog();
    }

    // function handleRemove() {
        // dispatch(Actions.removeClient(form.id));
    //     closeComposeDialog();
    // }


    // function handleUploadStart() {
    //     isUploading = true;
    //     //this.progress = 0;
    //     //this.setState({ isUploading: true, progress: 0 });
    // }

    // function handleProgress(progress) {
    //     //this.progress = progress;
    // }

    // function handleUploadError(error) {
    //     isUploading = false;
    //     console.error(error);
    // };

    // function handleUploadSuccess(filename) {
    //     form.avatar = filename;
    //     isUploading = false;
    //     //this.progress = 100;
    //     firebase
    //         .storage()
    //         .ref("images")
    //         .child(filename)
    //         .getDownloadURL()
    //         .then(url => {
    //             setInForm('avatar', url);
    //         });
    // };


    return (
        <Dialog
			classes={{
				paper: 'm-24'
			}}
			{...clientDialogAnalitycs.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>

					{/* <div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">code</Icon>
						</div>

						<TextField
							className="mb-24"
							// label="Código id"
							autoFocus
							// // id="id"
							// name="id"
							// value={form.id}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth

						/>
					</div> */}

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">code</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Código analitycs"
							autoFocus
							// id="analitycs"
							name="analitycs"
							value={form.analitycs}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

				</DialogContent>

				{clientDialogAnalitycs.type === 'new' ? (
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
						<IconButton onClick={ closeComposeDialog }>
							<Icon>close</Icon>
						</IconButton>
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
						<IconButton onClick={ closeComposeDialog }>
							<Icon>close</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
    );
}

export default ClientsDialogAnalitycs;
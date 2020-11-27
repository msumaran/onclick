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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import firebase from "firebase";

import FileUploader from "react-firebase-file-uploader";

const defaultFormState = {
    id: '',
    cardHolder: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
	cardCvv: '',

	pack: 'pack-1',
	packPrice: '',
};


function PaymentDialog(props) {

    let isUploading = false;
	// let progress = 0

    const dispatch = useDispatch();
    const paymentDialog = useSelector(({ paymentsApp }) => paymentsApp.payments.paymentDialog);
	
	const userUID = useSelector(({ auth }) => auth.user.uid);
	const userDisplayName = useSelector(({ auth }) => auth.user.data.displayName);
	const userLastName = useSelector(({ auth }) => auth.user.data.lastName);

	const dataUser = {
		id: userUID,
		displayName: userDisplayName,
		lastName: userLastName,
	}

    const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (paymentDialog.type === 'edit' && paymentDialog.data) {
            setForm({ ...paymentDialog.data });
        }

        /**
         * Dialog type: 'new'
         */
        if (paymentDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...paymentDialog.data
            });
        }
    }, [paymentDialog.data, paymentDialog.type, setForm]);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (paymentDialog.props.open) {
            initDialog();
        }
    }, [paymentDialog.props.open, initDialog]);

    function closeComposeDialog() {
        return paymentDialog.type === 'edit' ?
            dispatch(Actions.closeEditPaymentDialog()) :
            dispatch(Actions.closeNewPaymentDialog());
    }

    function canBeSubmitted() {
        return form.cardHolder.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        if (paymentDialog.type === 'new') {
            dispatch(Actions.addPayment(form, dataUser));
        } else {
            dispatch(Actions.updatePayment(form, userUID));
        }
        closeComposeDialog();
    }

    // function handleRemove() {
    //     dispatch(Actions.removePayment(form.id, userUID));
    //     closeComposeDialog();
    // }


    return (
        <Dialog
			classes={{
				paper: 'm-24'
			}}
			{...paymentDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Nombre en tarjeta"
							autoFocus
							id="cardHolder"
							name="cardHolder"
							value={form.cardHolder}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Número de tarjeta"
							autoFocus
							id="cardNumber"
							name="cardNumber"
							value={form.cardNumber}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Mes"
							autoFocus
							id="cardMonth"
							name="cardMonth"
							value={form.cardMonth}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Año"
							autoFocus
							id="cardYear"
							name="cardYear"
							value={form.cardYear}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="CVV"
							autoFocus
							id="cardCvv"
							name="cardCvv"
							value={form.cardCvv}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<Select	
							label="Elige un Paquete"
							labelId="pack"
							id="pack"
							name="pack"
							value={form.pack}
							onChange={handleChange}
							>
							<MenuItem defaultValue value={"pack-1"}>Paquete Tiny</MenuItem>
							<MenuItem value={"pack-2"}>Paquete Regular</MenuItem>
							<MenuItem value={"pack-3"}>Paquete FULL</MenuItem>
						</Select>
					</div>

				</DialogContent>

				{paymentDialog.type === 'new' ? (
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
						<IconButton onClick={closeComposeDialog}>
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
						<IconButton onClick={closeComposeDialog}>
							<Icon>close</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
    );
}

export default PaymentDialog;
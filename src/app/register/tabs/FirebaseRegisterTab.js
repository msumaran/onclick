import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as authActions from 'app/auth/store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FirebaseRegisterTab(props) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(authActions.registerWithFirebase(model));
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="displayName"
					label="Nombres"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Minimo 4 caracteres'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

<TextFieldFormsy
					className="mb-16"
					type="text"
					name="lastName"
					label="Apellidos"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Minimo 4 caracteres'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>


<TextFieldFormsy
					className="mb-16"
					type="text"
					name="razon_social"
					label="Razón Social"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Minimo 4 caracteres'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>


<TextFieldFormsy
					className="mb-16"
					type="text"
					name="ruc"
					label="RUC"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									business
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

<TextFieldFormsy
					className="mb-16"
					type="text"
					name="celular"
					label="Celular"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 9'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									phone
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>


				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					validations="equalsField:password-confirm"
					validationErrors={{
						equalsField: 'Passwords no iguales'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password-confirm"
					label="Confirmar Password"
					validations="equalsField:password"
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER WITH FIREBASE"
					disabled={!isFormValid}
				>
					Registrarse
				</Button>
			</Formsy>
		</div>
	);
}

export default FirebaseRegisterTab;

import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup.string().required('El campo es requerido.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden.')
    .required('La confirmación de la nueva contraseña es necesaria.')
})

export default schema

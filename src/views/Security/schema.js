import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup.string().required('This field is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match.')
    .required('Password confirm is required.')
})

export default schema

import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required!').min(6, 'Username must have minimum 6 characters!'),
    password: Yup.string().required('Password is required!')
})
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    username: Yup.string().required('Username is required!').min(6, 'Username must have minimum 6 characters!'),
    email: Yup.string().required('Email is required!').email('Email must be valid!'),
    password: Yup.string().required('Password is required!')
})
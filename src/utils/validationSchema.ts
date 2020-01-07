import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username can not be less than 5 characters')
    .max(30, 'Only a max of 30 character allowed')
    .required('Username is required'),
});

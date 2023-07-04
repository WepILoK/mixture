import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
    email: yup.string()
        .email('Введен некорректный email')
        .min(7, 'Длина почты не менее 7 символов')
        .max(40, 'Длина почты не более 40 символов')
        .required('Введите email'),
    password: yup.string()
        .min(6, 'Длина пароля не менее 6 символов')
        .required('Введите пароль'),
});

export const registerFormSchema = yup.object().shape({
    userName: yup.string()
        .min(4, 'Длина логина не менее 4 символов')
        .max(40, 'Длина логина не более 40 символов')
        .required('Введите логин'),
    password2: yup.string()
        .oneOf([yup.ref<string>('password')], 'Пароли не совпадают')
}).concat(loginFormSchema)
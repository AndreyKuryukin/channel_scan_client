import { lz } from '../../../../i18n';

//todo: apply decorator
export const TRANSLATIONS = lz({
    LOGIN: ['LOGIN_LOGIN_LABEL', 'Login', 'Логин'],
    PASSWORD: ['LOGIN_PASSWORD_LABEL', 'Password', 'Пароль'],
    BUTTON_TITLES: {
        SIGN_IN: ['LOGIN_SIGN_IN_LABEL', 'Sign in', 'Войти'],
        SIGN_UP: ['LOGIN_SIGN_UP_LABEL', 'Sign up', 'Регистрация'],
    },
    ERRORS: {
        INCORRECT_CREDENTIALS: [
            'LOGIN_ERROR_INCORRECT_CREDENTIALS',
            'Incorrect login or password',
            'Неверный логин или пароль',
        ],
        SEREVER_ERROR: [
            'LOGIN_ERROR_SERVER_ERROR',
            'Server error',
            'Ошибка на сервере',
        ],
    }
});

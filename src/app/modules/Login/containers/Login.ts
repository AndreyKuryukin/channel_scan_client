import { PureComponent, createElement as e } from 'react';
import { RouteComponentProps } from 'react-router-dom';


import { AppWrapperContext } from '../../AppWrapper';
import LoginCmp from '../components/LoginCmp';
import * as api from '../../../../api';
import { TRANSLATIONS } from '../constants';

interface LoginState {
    error?: string;
}

class Login extends PureComponent<RouteComponentProps, LoginState> {
    static contextType = AppWrapperContext;
    readonly state: LoginState = {};

    componentDidMount() {
        this.context.setTitle && this.context.setTitle('Login');
    }

    onLoginError(e: any) {
        switch (e.response.status) {
            case 401: {
                this.setState({
                    error: TRANSLATIONS.ERRORS.INCORRECT_CREDENTIALS,
                });
                break;
            }
            default: {
                this.setState({
                    error: TRANSLATIONS.ERRORS.SEREVER_ERROR,
                });
            }
        }
    }

    onLogin = (login: string, password: string) => {
        api.post('/api/v1/login', { login, password })
            .then(({ data }: any) => {
                console.log(data);
                this.props.history.push('/landing');
            })
            .catch((e: Error) => {
                this.onLoginError(e);
            });
    }

    render() {
        const { error } = this.state;
        return e(LoginCmp, {
            error,
            onLogin: this.onLogin,
        });
    }
}

export default Login;

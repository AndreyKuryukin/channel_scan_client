import {PureComponent, createElement as e} from 'react';

import { AppWrapperContext } from '../../AppWrapper';
import LoginCmp from '../components/LoginCmp';


class Login extends PureComponent {
    static contextType = AppWrapperContext;

    componentDidMount() {
        this.context.setTitle && this.context.setTitle('Login');
    }

    onLogin: (user: string, passwd: string) => {
        
    }

    render() {
        return e(LoginCmp, {
            login: this.onLogin
        });
    }
}

export default Login;

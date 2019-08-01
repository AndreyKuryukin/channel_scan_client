import * as React from 'react';

import { AppWrapperContext } from '../../AppWrapper';

class Login extends React.PureComponent {
    static contextType = AppWrapperContext;

    componentDidMount() {
        this.context.setTitle && this.context.setTitle('Login');
    }

    render() {
        return <div>Login page</div>;
    }
}

export default Login;

import * as React from 'react';

const e = React.createElement;

export interface LoginCmpProps {
    login: (user: string, passwd: string) => void;
}

class Login extends React.PureComponent<LoginCmpProps> {

    render() {
        return <div>Login page</div>;
    }
}

export default Login;

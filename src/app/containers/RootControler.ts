import * as React from 'react';

import AppWrapper from '../modules/AppWrapper';
import Login from '../modules/Login';

const e = React.createElement;

interface RootControlerProps {
    title: string;
}

class RootControler extends React.PureComponent<RootControlerProps, never> {

    render() {
        const { title } = this.props;
        return e(AppWrapper, { title }, e(Login));
    }
}

export default RootControler;

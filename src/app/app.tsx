import './muiFix';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as styles from './scss/styles.scss';
import RootControler from './containers/RootControler';

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter>
            <React.StrictMode>
                <RootControler title={'IPTV Channels scanner'}/>
            </React.StrictMode>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById('app-root'));

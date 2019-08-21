import './scss/styles.scss';
import './polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import RootControler from './containers/RootControler';

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#1dc21d',
                contrastText: '#ffffff'
            },
        },
});

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter>
            <React.StrictMode>
                <MuiThemeProvider theme={theme}>
                    <RootControler title={'IPTV Channels scanner'} />
                </MuiThemeProvider>
            </React.StrictMode>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById('app-root'));

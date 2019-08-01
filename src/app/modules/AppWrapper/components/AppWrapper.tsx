import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

interface AppWrapperProps {
    title?: string;
}

interface AppWrapperState {
    title: string,
}

export const AppWrapperContext = React.createContext({});

export default class AppWrapper extends React.PureComponent<AppWrapperProps, AppWrapperState> {

    readonly state: AppWrapperState = { title: '' };

    setTitle = (title: string) => {
        this.setState({ title });
    };

    readonly providedContext = {
        setTitle: this.setTitle,
    }

    render() {
        return <React.Fragment>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {this.state.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppWrapperContext.Provider value={this.providedContext}>
                {this.props.children}
            </AppWrapperContext.Provider>
        </React.Fragment>;
    }
}

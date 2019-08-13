import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SideMenu from './SideMenu';
import TopBar from './TopBar';

interface AppWrapperProps {
    title?: string;
}

interface Classes {
    classes?: any;
}

interface AppWrapperState {
    title: string;
    sideOpen: boolean;
}

export const AppWrapperContext = React.createContext({});

class AppWrapper extends React.PureComponent<AppWrapperProps & Classes, AppWrapperState> {

    readonly state: AppWrapperState = { title: '', sideOpen: false };

    setTitle = (title: string) => {
        this.setState({ title });
    };

    readonly providedContext = {
        setTitle: this.setTitle,
    };

    toggleSideMenu = (e: React.SyntheticEvent) => {
        this.setState({ sideOpen: !this.state.sideOpen });
    };

    render() {
        const { classes } = this.props;
        return <div className={classes.root}>
            <CssBaseline />
            <TopBar
                sideMenuOpen={this.state.sideOpen}
                toggleSideMenu={this.toggleSideMenu}
            >
                {this.state.title}
            </TopBar>
            <SideMenu
                open={this.state.sideOpen}
                toggle={this.toggleSideMenu}
            />
            <AppWrapperContext.Provider value={this.providedContext}>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </AppWrapperContext.Provider>
        </div>;
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const themeWraped: React.SFC<AppWrapperProps> = function themeWrapped(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    return <AppWrapper {...props} classes={classes}/>;
};

export default themeWraped;

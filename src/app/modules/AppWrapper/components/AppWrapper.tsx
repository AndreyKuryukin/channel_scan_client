import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import SideMenu from './SideMenu';
import TopBar from './TopBar';

interface AppWrapperProps {
    title?: string;
    sideMenu?: boolean;
    topBar?: boolean;
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
        const { classes, sideMenu, topBar } = this.props;
        const { sideOpen, title } = this.state;
        return <div className={classes.root}>
            <CssBaseline />
            {topBar && <TopBar
                sideMenuOpen={sideOpen}
                toggleSideMenu={this.toggleSideMenu}
            >
                {title}
            </TopBar>}
            {sideMenu && <SideMenu
                open={sideOpen}
                toggle={this.toggleSideMenu}
            />}
            <AppWrapperContext.Provider value={this.providedContext}>
                <main className={clsx(classes.content, {
                    [classes.contentSide]: sideMenu && !topBar,
                    [classes.contentTop]: !sideMenu && topBar,
                    [classes.contentTop]: !sideMenu && topBar,
                })}>
                    {topBar && <div className={classes.toolbar} />}
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
            height: '100%',
            width: '100%'
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
            height: '100%',
            width: '100%',
            padding: 0
        },
        contentSide: {
            padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(3)}px`,
        },
        contentTop: {
            padding: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px 0`,
        },
        contentBox: {
            padding: theme.spacing(3),
        }
    }),
);

const themeWraped: React.SFC<AppWrapperProps> = function themeWrapped(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    return <AppWrapper {...props} classes={classes} />;
};

export default themeWraped;

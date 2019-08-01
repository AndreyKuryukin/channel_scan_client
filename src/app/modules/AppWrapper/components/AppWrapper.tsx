import * as React from 'react';
import SideMenu from './SideMenu';
import TopBar from './TopBar';

interface AppWrapperProps {
    title?: string;
}

interface AppWrapperState {
    title: string;
    sideOpen: boolean;
}

export const AppWrapperContext = React.createContext({});

export default class AppWrapper extends React.PureComponent<AppWrapperProps, AppWrapperState> {

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
        return <React.Fragment>
            <TopBar
                sideMenuOpen={this.state.sideOpen}
                toggleSideMenu={this.toggleSideMenu}
            >
                <AppWrapperContext.Provider value={this.providedContext}>
                    {this.props.children}
                </AppWrapperContext.Provider>
            </TopBar>
            <SideMenu
                open={this.state.sideOpen}
                toggle={this.toggleSideMenu}
            />
        </React.Fragment>;
    }
}

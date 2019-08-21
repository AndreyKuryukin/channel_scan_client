import * as React from 'react';
import { Route as ReactRoute, Switch } from 'react-router-dom';

import AppWrapper from '../modules/AppWrapper';
import Routes, { Module } from '../constants/modules';
import ErrorWrapper from '../components/ErrorWrapper';
const e = React.createElement;
const Lazy = React.lazy;
const Suspense = React.Suspense;

interface RootControlerProps {
    title: string;
}

interface RootControlerState {
    sideMenu: boolean;
    topBar: boolean;
}

class RootControler extends React.PureComponent<RootControlerProps, RootControlerState> {

    readonly state: RootControlerState = { topBar: true, sideMenu: true };

    wrapWithSuspense(component: React.ReactNode): React.ReactNode {
        return e(Suspense, { fallback: e('div', {}, 'Loading') }, component);
    }

    wrapWithError(component: React.ReactNode): React.ReactNode {
        return e(ErrorWrapper, {}, component);
    }

    wrapModule(component: React.ReactNode): React.ReactNode {
        return this.wrapWithError(this.wrapWithSuspense(component));
    }

    composeRoutes(modules: Module[]): React.ReactNode[] {
        return modules.map((module: Module) => {
            const {
                urlPath,
                componentLoader,
                uid,
                sideMenu = true,
                topBar = true,
            } = module;
            return e(ReactRoute, {
                key: uid,
                path: urlPath,
                render: () => this.wrapModule(e(Lazy(() => {
                    this.setState({ sideMenu, topBar });
                    return componentLoader();
                }))),
            });
        });
    }

    render() {
        const { title } = this.props;
        const { sideMenu, topBar } = this.state;
        return e(
            AppWrapper,
            { title, sideMenu, topBar },
            e(Switch, {}, this.composeRoutes(Routes)
            ));
    }
}

export default RootControler;

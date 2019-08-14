import * as React from 'react';
import { Route as ReactRoute, Switch } from 'react-router-dom';

import AppWrapper from '../modules/AppWrapper';
import Routes, { Module } from '../constants/modules';

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

    wpapWithSuspense(lazyComponent: React.ReactNode): React.ReactNode {
        return e(Suspense, { fallback: e('div', {}, 'Loading') }, lazyComponent);
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
                render: () => this.wpapWithSuspense(e(Lazy(() => {
                    this.setState({ sideMenu, topBar });
                    return componentLoader()
                        .then((res) => {
                            return res;
                        });
                }))),
            });
        });
    }

    render() {
        const { title } = this.props;
        const { sideMenu, topBar } = this.state;
        return e(AppWrapper, { title, sideMenu, topBar }, e(Switch, {}, this.composeRoutes(Routes)));
    }
}

export default RootControler;

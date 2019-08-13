import * as React from 'react';
import { Route as ReactRoute, Switch } from 'react-router-dom';

import AppWrapper from '../modules/AppWrapper';
import Routes, { Route } from '../constants/modules';

const e = React.createElement;
const Lazy = React.lazy;
const Suspense = React.Suspense;

interface RootControlerProps {
    title: string;
}

class RootControler extends React.PureComponent<RootControlerProps, never> {

    wpapWithSuspense(lazyComponent: React.ReactNode): React.ReactNode {
        return e(Suspense, { fallback: e('div', {}, 'Loading') }, lazyComponent);
    }

    composeRoutes(modules: Route[]): React.ReactNode[] {
        return modules.map((module: Route) => {
            const {
                urlPath,
                componentLoader,
                uid,
            } = module;
            return e(ReactRoute, {
                key: uid,
                path: urlPath,
                render: () => this.wpapWithSuspense(e(Lazy(() => {
                    return componentLoader();
                }))),
            });
        });
    }

    render() {
        const { title } = this.props;
        return e(AppWrapper, { title }, e(Switch, {}, this.composeRoutes(Routes)));
    }
}

export default RootControler;

export interface Route {
    urlPath: string;
    componentLoader: () => Promise<any>;
    uid: string;
}

const Routes: Route[] = [
    {
        urlPath: '/',
        componentLoader: () => import(/*webpackChunkName: "modules/login"*/'../modules/Login'),
        uid: 'Login',
    },
];

export default Routes;
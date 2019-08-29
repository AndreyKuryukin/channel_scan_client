export interface Module {
    urlPath: string;
    componentLoader: () => Promise<any>;
    uid: string;
    sideMenu: boolean;
    topBar: boolean
}

const Routes: Module[] = [
    {
        urlPath: '/',
        componentLoader: () => import(/*webpackChunkName: "modules/login"*/'../modules/Login'),
        uid: 'Login',
        sideMenu: false,
        topBar: false
    }
];

export default Routes;

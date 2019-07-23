import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as styles from './scss/styles.scss';
import CssEdit from './components/CssEdit';

interface AppProps {
    title?: string;
}

const menuItems = [
    {
        title: 'ch',
        value: 'ch',
        hasValue: true,
    },
    {
        title: 'em',
        value: 'em',
        hasValue: true,
    },
    {
        title: 'ex',
        value: 'ex',
        hasValue: true,
    },
    {
        title: 'ic',
        value: 'ic',
        hasValue: true,
    },
    {
        title: 'lh',
        value: 'lh',
        hasValue: true,
    },
    {
        title: 'rem',
        value: 'rem',
        hasValue: true,
    },
    {
        title: 'rlh',
        value: 'rlh',
        hasValue: false,
    },
    {
        title: 'vh',
        value: 'vh',
        hasValue: true,
    },
    {
        title: 'vw',
        value: 'vw',
        hasValue: true,
    },
    {
        title: 'vi',
        value: 'vi',
        hasValue: true,
    },
    {
        title: 'vb',
        value: 'vb',
        hasValue: true,
    },
    {
        title: 'vmin',
        value: 'vmin',
        hasValue: false,
    },
    {
        title: 'vmax',
        value: 'vmax',
        hasValue: false,
    },
    {
        title: 'px',
        value: 'px',
        hasValue: true,
    },
    {
        title: 'cm',
        value: 'cm',
        hasValue: true,
    },
    {
        title: 'mm',
        value: 'mm',
        hasValue: true,
    },
    {
        title: 'Q',
        value: 'Q',
        hasValue: true,
    },
    {
        title: 'in',
        value: 'in',
        hasValue: true,
    },
    {
        title: 'pc',
        value: 'pc',
        hasValue: true,
    },
    {
        title: 'pt',
        value: 'pt',
        hasValue: true,
    },
    {
        title: 'mozmm',
        value: 'mozmm',
        hasValue: true,
    },
    {
        title: 'auto',
        value: 'auto',
        hasValue: false,
    },
]

class App extends React.PureComponent<AppProps, {}> {
    props: AppProps;

    render() {
        const { title } = this.props;
        return <React.Fragment>
            <div className={styles.appTitle}>{title}</div>
            <CssEdit menuItems={menuItems}
                     onChange={value => console.log(value)}/>
        </React.Fragment>;
    }
}

ReactDOM.render(<App title={'Тестовое задание'}/>, document.getElementById('app-root'));

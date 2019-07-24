import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as styles from './scss/styles.scss';
import CssEdit from './components/CssEdit';
import menuItems from './menuItems';

interface AppProps {
    title?: string;
}

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

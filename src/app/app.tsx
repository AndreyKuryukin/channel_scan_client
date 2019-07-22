import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps {
    title?: string;
}

class App extends React.PureComponent<AppProps, {}> {
    props: any;

    render() {
        const { title } = this.props;
        return <div>{title}</div>;
    }
}

ReactDOM.render(<App title={'Hello there!'}/>, document.getElementById('react-root'));

import * as React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { TRANSLATIONS } from './translations';

interface ErrorPageProps {
    children?: [];
};

interface Classes {
    classes?: any;
}

interface ErrorPageState {
    error: boolean;
}

class ErrorWrapper extends React.PureComponent<ErrorPageProps & Classes, ErrorPageState> {
    readonly state: ErrorPageState = {
        error: false,
    };

    componentDidCatch() {
        this.setState({ error: true });
    }

    renderError = (classes: any) => {
        return <div className={classes.container}>
            {TRANSLATIONS.TITLE}
        </div>;
    }

    render() {
        return this.state.error ? this.renderError(this.props.classes) : this.props.children;
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: 'white',
            background: 'grey',
        }
    }),
);

const themeWraped: React.SFC<ErrorPageProps> = function themeWrapped(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    return <ErrorWrapper {...props} classes={classes} />;
};

export default themeWraped;

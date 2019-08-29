import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import loginBackgroundJpg from 'url-loader!../resources/loginBackground.jpg';
import { TRANSLATIONS } from '../constants';

const { useState } = React;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '100%',
        width: '100%',
    },
    background: {
        position: 'absolute',
        backgroundImage: `url(${loginBackgroundJpg})`,
        filter: 'blur(5px)',
        height: '100%',
        width: '100%',
    },
    loginPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        zIndex: 1,
        padding: '26px',
        borderRadius: '4px',
        background: 'white',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: '22px',
    },
    input: {
        fontSize: '22px',
    },
    loginButton: {
        margin: theme.spacing(1),
        width: '60%',
        height: '48px',
    },
    signupButton: {
        margin: theme.spacing(1),
        height: '48px',
    },
    buttonContainer: {
        margin: `${theme.spacing(1)}px 0 0 0`,
        display: 'flex',
        flexDirection: 'row',
    },
}));

export interface LoginCmpProps {
    onLogin: (user: string, passwd: string) => void;
    error?: string;  
}

const Login: React.SFC<LoginCmpProps> = ({ onLogin, onSignUp }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return <div className={classes.container}>
        <div className={classes.background} />
        <div className={classes.loginPanel}>
            <Typography variant="h3" component="h2">
                TV List
            </Typography>
            <TextField
                id="outlined-name"
                label={TRANSLATIONS.LOGIN}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={login}
                onChange={v => setLogin(v.target.value)}
                InputProps={{
                    classes: {
                        input: classes.input,
                    },
                }}
            />
            <TextField
                id="outlined-password-input"
                label={TRANSLATIONS.PASSWORD}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                value={password}
                onChange={v => setPassword(v.target.value)}
                InputProps={{
                    classes: {
                        input: classes.input,
                    },
                }}
            />
            <div className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.loginButton}
                    onClick={() => onLogin(login, password)}
                    >
                    {TRANSLATIONS.BUTTON_TITLES.SIGN_IN}
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.signupButton}
                    href={'/signup'}
                    onClick={() => onSignUp()}
                    >
                    {TRANSLATIONS.BUTTON_TITLES.SIGN_UP}
                </Button>
            </div>
        </div>
    </div>;
};

export default Login;

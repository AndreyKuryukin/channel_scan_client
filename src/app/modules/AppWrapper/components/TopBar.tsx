import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface TopBarProps {
    sideMenuOpen: boolean;
    toggleSideMenu: (e: React.SyntheticEvent) => void;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
    }),
);

const TopBar: React.SFC<TopBarProps> = function MiniDrawer({ sideMenuOpen, toggleSideMenu, children }) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <AppBar
        position="fixed"
        classes={{ root: classes.appBar }}
        className={clsx({
            [classes.appBarShift]: sideMenuOpen,
        })}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleSideMenu}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: sideMenuOpen,
                })}
            >
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap>
                {children}
            </Typography>
        </Toolbar>
    </AppBar>;
};

export default TopBar;

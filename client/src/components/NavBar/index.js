import React from "react";
// import { Link } from "react-router-dom";
// import "./style.css";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

function NavBar() {

    const classes = useStyles();

    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Homeschoolr
                    </Typography>
                    {/* <Button color="inherit" href="/">Login</Button> */}
                    <Button color="inherit" href="/">Logout</Button>

                </Toolbar>
            </AppBar>
        </div>


        // <nav className="navbar navbar-expand-lg text-light">
        //     <div className="container">
        //         <Link className="navbar-brand" to="/">Homeschoolr</Link>
        //         <ul className="navbar-nav">
        //             <li className="nav-item">
        //                 <Link className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
        //                 to="/search">Login</Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link className={window.location.pathname === "/register" ? "nav-link active" : "nav-link"}
        //                 to="/search">Register</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
    );
};

export default NavBar;  
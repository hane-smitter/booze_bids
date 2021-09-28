import React from "react";
import {
  AppBar,
  Typography,
  useMediaQuery,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import useStyles from './styles';
import Logo from '../../images/smoke.png';
import Kenya from '../../images/kenya.png';
import { Link } from "react-router-dom";

const Nav = () => {
    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);

    //import styles
    const classes = useStyles();

    // to handle the menu
    const handleMenu = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleMenuClose = _ => {
        setAnchor(null);
    }

  //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const displayMobile = () => (
    <React.Fragment>  
      <IconButton
        edge="start"
        color="inherit"
        aria-controls="toggle-mobile-menu"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="toggle-mobile-menu"
        /* to open the anchor at the top below the cursor */
        anchorEl={anchor}
        /* anchor origin so that it open it that location */
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/pastbids">Past Bids</Link>
        </MenuItem>
      </Menu>

      <Link to="/"><img alignItems="center" src={Logo} className={classes.image,classes.position} /></Link>
    </React.Fragment>
  );
  const displayDesktop = () => (
    <React.Fragment>
      <div>
        <Link to="/">
          <img src={Logo} className={classes.image} />
          <img alignItems="center" src={Kenya} className={classes.kenya} />
        </Link>
      </div>
      
      <Grid container justifyContent="space-evenly" direction="row" alignItems="center" className={classes.navContainer}>
        <Grid item xs>
          <Link className={classes.navLink} to="/">Home</Link>
        </Grid>
        <Grid item xs>
          <Link className={classes.navLink} to="/pastbids">Past Bids</Link>
        </Grid>
        <Grid item >
          <span className={classes.time}> 
            { new Date().toLocaleString('en-US', {
                                                weekday: 'short', // long, short, narrow
                                                day: 'numeric', // numeric, 2-digit
                                                year: 'numeric', // numeric, 2-digit
                                                month: 'short', // numeric, 2-digit, long, short, narrow
                                                hour: 'numeric', // numeric, 2-digit
                                                minute: 'numeric', // numeric, 2-digit
                                            }) } 
          </span>
        </Grid>
      </Grid>
      
    </React.Fragment>
  );
  return (
    <AppBar className={classes.appBar} position="sticky" color="inherit"> 
      <Toolbar className={classes.navigation}>
        {isMobile ? displayMobile() : displayDesktop()}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

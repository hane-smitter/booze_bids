import React from "react";
import {
  AppBar,
  Typography,
  useMediaQuery,
  Toolbar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import useStyles from './styles';
import Logo from '../../images/booze_bids_logo.png';

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
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/pastbids">Past Bids</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/faqs">FAQs</Link>
        </MenuItem>
      </Menu>

      <Typography className={classes.heading} variant="h2" align="center">
        Logo
      </Typography>
    </React.Fragment>
  );
  const displayDesktop = () => (
    <React.Fragment>
      <div>
        <img src={Logo} className={classes.image} />
      </div>
      
      <Grid container justifyContent="space-evenly" direction="row" alignItems="center" className={classes.navContainer}>
        <Grid item xs>
          <Link href="/">Home</Link>
        </Grid>
        <Grid item xs>
          <Link href="/pastbids">Past Bids</Link>
        </Grid>
        <Grid item xs>
          <Link href="/faqs">FAQs</Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Toolbar className={classes.navigation}>
        {isMobile ? displayMobile() : displayDesktop()}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

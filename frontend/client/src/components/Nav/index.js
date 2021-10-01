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
  Box,
  Button,
  TextField,
  InputAdornment,
  styled,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import useStyles from './styles';
import Logo from '../../images/smoke.png';
import Kenya from '../../images/kenya.png';
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { alpha } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Nav = () => {
    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);

    //import styles
    const classes = useStyles();

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));

    const [criteria, setCriteria] = React.useState("1");
    const [searchItem, setSearchItem] = React.useState("");

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

      <Link to="/"><img alignItems="center" src={Logo} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} className={classes.image,classes.position} /></Link>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

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
      <Box>
      <Link to="/">
        <Typography align="right" className={classes.navLink} style={{ fontSize:'12px',padding:'2px' }} component="body" variant="body1"> Register now!</Typography>
      </Link>
      <Grid container rowSpacing={2} direction="row"  align="right" className={classes.navContainer}>
        {/* <Grid item xs>
          <Link className={classes.navLink} to="/">Home</Link>
        </Grid>
        <Grid item xs>
          <Link className={classes.navLink} to="/pastbids">Past Bids</Link>
        </Grid> */}
        
          <Grid item xs={12} sm={4}>
          <TextField
            label="Phone"
            variant="outlined"
            margin="3"
            className={classes.rootTextField}
            style={{width:"150px"}}
            size="small"
          />
          </Grid>
          <Grid item xs={12} sm={4}>
          <TextField
            label="Password"
            variant="outlined"
              margin="3"
            className={classes.rootTextField}
            style={{width:"170px", marginLeft:'25px'}}
            size="small"
          />
          </Grid>
          <Grid item xs={12} sm={4}>
          <Button className={classes.btn} type="submit" variant="contained" color="primary">
            Login
          </Button>
          </Grid>
        

        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6}>
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
      </Box>
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

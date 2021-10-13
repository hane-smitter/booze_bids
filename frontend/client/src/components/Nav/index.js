import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Avatar,
  Divider,
  SwipeableDrawer
} from "@material-ui/core";
import decode from 'jwt-decode';
import * as actionType from '../../constants';

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import useStyles from './styles';
import Logo from '../../images/smoke.png';
import Kenya from '../../images/kenya.png';
import { Link, useHistory } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { alpha, fabClasses } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../actions/users.js";
import { AUTH } from '../../constants';

import { useLocation } from "react-router";
import { unsetErr, unsetStatus } from "../../actions/errors";
import ShowFeedback from "../utils/ShowFeedback";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import HistoryIcon from '@mui/icons-material/History';

const Nav = () => {
    const [anchor, setAnchor] = React.useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [state, setState] = React.useState({
      left: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
    const open = Boolean(anchor);
    //import styles
    const classes = useStyles();

    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
  
      history.push('/');
  
      setUser(null);
    };
  
    useEffect(() => {
      const token = user?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

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
  //form
  const {
    err,
    loading,
    status,
  } = useSelector((state) => state.app);

  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err.length > 0));

  useEffect(() => {
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    };
  }, []);
  useEffect(() => {
    setAlertOpen(Boolean(status?.info));
  }, [status]);
  useEffect(() => {
    setErrAlertOpen(Boolean(err.length > 0));
  }, [err]);

  let formFields = [
    "phone",
    "password",
  ];
  let formErrors = [];
  let formErrorsName = [];
  formErrors =
    err.length && err.filter((error) => formFields.includes(error.param));
  formErrors.length &&
    formErrors.map((error) => formErrorsName.push(error.param));

  const makeUserSchema = Yup.object().shape({
    phone: Yup.number()
      .required("Enter Phone")
      .positive("Invalid No.")
      .integer(),
    password: Yup.string().required('Enter Password'),
  });
  const Input = ({
    form,
    field: { value, name },
    formErrors,
    formErrorsName,
    ...others
  }) => {
    return (
      <TextField
        name={name}
        value={value}
        error={
          (getIn(form.touched, name) && !!getIn(form.errors, name)) ||
          formErrorsName.indexOf(name) !== -1
        }
        helperText={
          (getIn(form.touched, name) && getIn(form.errors, name)) ||
          (formErrorsName.indexOf(name) !== -1 &&
            formErrors[formErrorsName.indexOf(name)].msg)
        }
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        variant="outlined"
        margin="normal"
        fullWidth
        {...others}
      />
    );
  };
  //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //drawer
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          {user &&
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'Welcome, '+user?.result?.surname} />
            </ListItem>
          }
          <Divider />
          {!user &&
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary='Login' />
            </ListItem>
          }
          {!user &&
            <ListItem button component={Link} to="/register">
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary='Register' />
            </ListItem>
          }
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary='Past Bids' />
          </ListItem>
      </List>
      <Divider />
      {user?.result &&
      <List>
          <ListItem button  onClick={logout}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
      </List>
      }
      
    </Box>
  );
  //drawer
  const displayMobile = () => (
    
    <React.Fragment>  

        
        <Button onClick={toggleDrawer('left', true)} style={{color:"white"}}><MenuIcon/></Button>      

    {/*
      <Menu
        id="toggle-mobile-menu"
        anchorEl={anchor}
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
        {user?.result &&
        <MenuItem onClick={handleMenuClose}>
          <Typography>Hi, <span style={{ fontStyle: 'italic'}}>{user?.result?.surname}</span></Typography>
        </MenuItem>
        }
        <MenuItem onClick={handleMenuClose}>
          <Link className={classes.navLinkMobi} to="/">Home</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link className={classes.navLinkMobi} to="/pastbids">Past Bids</Link>
        </MenuItem>
      </Menu>*/}

      <Link to="/"><img alignItems="center" src={Logo} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} className={classes.image,classes.position} /></Link>
      <SearchBar
      className={classes.sb}
          value={searchItem}
          onRequestSearch={() => console.log("onRequestSearch")}
        /> 
        <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
        </SwipeableDrawer>

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
      {!user &&
      <Link to="/register">
        <Typography align="right" className={classes.navLink} style={{ fontSize:'12px',padding:'2px' }} component="body" variant="body1"> Register now!</Typography>
      </Link>
      }
        {/* <Grid item xs>
          <Link className={classes.navLink} to="/">Home</Link>
        </Grid>
        <Grid item xs>
          <Link className={classes.navLink} to="/pastbids">Past Bids</Link>
        </Grid> */}
        
        <Formik
          enableReinitialize={true}
          initialValues={{               
            phone: "",
            password: "",
          }}
          onSubmit={function (values, actions) {
            function shouldClearForm() {
                actions.resetForm();
            }
            dispatch(loginUser(values, history))
            window.shouldClearForm = shouldClearForm;
            
            
          }}
          validationSchema={makeUserSchema}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              autoComplete="off"
              noValidate
            >
              <Grid container rowSpacing={2} direction="row"  align="right" className={classes.navContainer}>
                <Grid item xs={12} sm={4}>
                {user?.result ? 
                <Link className={classes.navLink} to="/pastbids">Past Bids</Link>
                :
                <Field
                  label="Phone"
                  variant="outlined"
                  margin="3"
                  className={classes.rootTextField}
                  style={{width:"150px"}}
                  size="small"
                  name="phone"
                  type="number"
                  formErrors={formErrors}
                  formErrorsName={formErrorsName}
                  component={Input}
                />
                }
                </Grid>
                <Grid item xs={12} sm={4}>
                {user?.result ? 
                <Link to='#' className={classes.navLink2}> Hi, <span style={{fontStyle:'italic'}}>{user?.result.surname}</span></Link>
                :
                <Field
                  label="Password"
                  variant="outlined"
                  margin="3"
                  className={classes.rootTextField}
                  style={{width:"170px", marginLeft:'25px'}}
                  size="small"
                  name="password"
                  type="password"
                  formErrors={formErrors}
                  formErrorsName={formErrorsName}
                  component={Input}
                />
                }
                </Grid>
                <Grid item xs={12} sm={4}>
                {user?.result ? 
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                :
                <Button className={classes.btn} type="submit" variant="contained" color="primary">
                  {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Login"
                    )}
                </Button>
                }
                </Grid>
                <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={6}>
                <span className={classes.time} style={{ fontFamily:'ticking-time-bomb'}}> 
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
          </form>
          )}
        </Formik>

        
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

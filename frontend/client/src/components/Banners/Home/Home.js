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
  Paper
} from "@material-ui/core";
import Carousel from 'react-material-ui-carousel';
import banner_img from '../../../images/boy.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './styles';
import BannerFile from './Banner';
import Modal from '@mui/material/Modal';
import { Link, useHistory } from "react-router-dom";
import decode from 'jwt-decode';
import * as actionType from '../../../constants';
import { useLocation } from "react-router";
import { unsetErr, unsetStatus } from "../../../actions/errors";
import ShowFeedback from "../../utils/ShowFeedback";
import { batch, useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Formik, Field, getIn } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../actions/users.js";
import { AUTH } from '../../../constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const Banner = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
        history.push('/');
    
        setUser(null);
      };
    //frorm
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
    return (
        <div className={classes.root}>
            {isMobile ?
            <Paper /* elevation={3} */ className={classes.imgContainerMobi}>
                {/* <img src={banner_img} className={classes.image}/> */}
                <div  >
                    <Grid container style={{height:'auto'}}>
                        <Grid item style={{ position:'absolute',top:'13%', right:'10%'}}>
                            {!user ? <Button onclick={handleOpen} style={{ paddingLeft:30,paddingRight:30,backgroundColor:'#4472c4', color:'#fff' }} fullWidth>Login</Button> 
                            :  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                            }
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
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
                                            
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                            
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
                                            
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                            
                                            
                                            :
                                            <Button className={classes.btn} type="submit" variant="contained" color="primary">
                                            {loading ? (
                                                <CircularProgress style={{ color: "white" }} />
                                                ) : (
                                                "Login"
                                                )}
                                            </Button>
                                            
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
                            </Modal>
                        </Grid>
                        <Grid item style={{ position:'absolute',top:'13%', left:'10%'}}>
                            {!user ? <Link to="/register" ><Button style={{ paddingLeft:30,paddingRight:30,backgroundColor:'#4472c4', color:'#fff' }} fullWidth>Register</Button></Link>
                            : <Button style={{ paddingLeft:30,paddingRight:30,backgroundColor:'#4472c4', color:'#fff' }} fullWidth>Hi, {user?.result?.surname}</Button> }
                        </Grid>
                    </Grid>
                    <BannerFile/>
                </div>
            </Paper>
            :
            <Paper /* elevation={3} */ className={classes.imgContainer}>
            {/* <img src={banner_img} className={classes.image}/> */}
            <div >
                <BannerFile/>
            </div>
        </Paper>
}
        </div>
    )
}

export default Banner;


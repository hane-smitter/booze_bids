import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Box, useMediaQuery, useTheme } from "@material-ui/core";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { batch, useDispatch, useSelector } from "react-redux";

import Navbar from "../Nav";
import useStyles from "./styles.js";
import Footer from "../Footer";
import { unsetErr, unsetStatus } from "../../actions/errors";
import ShowFeedback from "../utils/ShowFeedback";
import Form from "./Form";

const Detail = () => {
  const { products, err, status } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err));
  const locationRouter = useLocation();
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
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


  const nav = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  };
  const navVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 0.5,
      },
    },
    leave: {
      opacity: 0,
    },
  };

  const darkVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 1,
      },
    },
    leave: {
      opacity: 0,
    },
  };
  const Cont = () => {
    return (
      <span>
      <ShowFeedback
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          severity={status?.info?.severity}
          msg={status?.info?.message}
        />
        {err.length > 0 &&
          err.map((error) => (
            <ShowFeedback
              alertOpen={errAlertOpen}
              setAlertOpen={setErrAlertOpen}
              severity={"error"}
              msg={error.msg}
              title="Ooops!"
            />
          ))}

        {/* <motion.div
          style={nav}
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        > */}
          <Navbar />
        {/* </motion.div> */}
          <Grid container  className={classes.darkBox} justifyContent="center">
          <Grid
              item
              xs={12} sm={4}>
              </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Form/>
            </Grid>
            <Grid xs={12} sm={4}
              item>
                
              </Grid>
          </Grid>
        <Footer />
        </span>
    );
  };
  return (
    <>
    {!isMobile &&
    <Container maxwidth="md">
      {Cont()}
    </Container>
    }
    {isMobile &&
    <span>
      {Cont()}
    </span>
    }
    </>
  );
};

export default Detail;

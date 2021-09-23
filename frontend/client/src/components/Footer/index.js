import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import useStyles from './styles.js';

export default function Footer() {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="p" color="inherit">
                All rights reserved.  ©2021 Bidspesa  &nbsp;|    &nbsp;info@bidspesa.com   &nbsp;|   &nbsp;+2547000XXXX  &nbsp;|  &nbsp;Terms and conditions apply
              </Typography>
            </Toolbar>
            <Toolbar>
              <Typography variant="p" color="inherit">
              Auctioneers licence no 006422 held by Mr. Doe, Auctioneer, trading under the name Bensure Auctioneers duly authorized and regulated by the Auctioneers Board of Kenya.

                Liquor licence no. LID-XXX held by ABC X LTD.
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}
import { AppBar, Avatar, Container, Grid, List, ListItem, Toolbar, Typography, ListItemText, ListItemAvatar, Divider } from "@material-ui/core";
import React from "react";
import useStyles from './styles.js';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import BP from '../../images/favicon.png'; 
import Logo from '../../images/smoke.png'; 

export default function Footer() {
    const classes = useStyles();
    return (
        <Container className={classes.appBar} position="static" color="primary">
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.headers} gutterBottom variant="h6">
                ABOUT
              </Typography>
              <hr className={classes.divider}/>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                          <img className={classes.logo} src={Logo} />
                        </ListItemAvatar>
                      </ListItem>
                      <ListItem  className={classes.center}>
                        <Typography variant="l" color="inherit">
                          Bidspesa is a licensed bidding company that deals with abcd and is ...
                        </Typography>
                    </ListItem>
                </List>
            </Grid> 
            <Grid item xs={12} sm={4}>
              <Typography className={classes.headers} gutterBottom variant="h6">
                CONTACT
              </Typography>
              <hr className={classes.divider}/>
                <List >
                    <ListItem className={classes.center}>
                        <ListItemText primary={'Phone: 254789XXXXX'} />
                    </ListItem>
                    <ListItem  className={classes.center}>
                        <ListItemText primary={'Email: info@bidspesa.com'} />
                    </ListItem>
                </List>
            </Grid> 
            <Grid item xs={12} sm={4}>
              <Typography className={classes.headers} gutterBottom variant="h6">
                LICENSE
              </Typography>
              <hr className={classes.divider}/>
                <List>
                    <ListItem>
                      <Typography className={classes.center} variant="l" color="inherit">
                        The Operator of this website, is licensed and regulated by the Auctioneers Board under License number XXXXXXXXX. Held by XXXXXXXX Trading under the name XXXXXXXXXX
                      </Typography>
                    </ListItem>
                </List>
            </Grid> 
            </Grid>
            <hr style={{ maxWidth:'97%'}}/>
            <Toolbar>
              <Typography variant="l" className={classes.center} color="inherit">
              Copyright © 2021 bidspesa limited.  &nbsp;&nbsp;All rights reserved ® <br/>
              Version 1.0.1 2021-09-24
              </Typography>
            </Toolbar>
          </Container>
    )
}
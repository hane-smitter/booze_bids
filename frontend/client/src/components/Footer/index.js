import { AppBar, Avatar, Container, Grid, List, ListItem, Toolbar, Typography, ListItemText, ListItemAvatar, Divider } from "@material-ui/core";
import React from "react";
import useStyles from './styles.js';
import BP from '../../images/favicon.png'; 
import Logo from '../../images/smoke.png'; 
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
    const classes = useStyles();
    return (
        <Container className={classes.appBar} position="static" color="primary">
            <Grid  container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={3}>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                          <img className={classes.logo} src={Logo} />
                        </ListItemAvatar>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography variant="body1" color="inherit">
                          Bidspesa is an online auction company that deals in new goods only. 
                          This is a dynamic auction based on unique bids on a marked time.
                        </Typography>
                    </ListItem>
                </List>
            </Grid> 
            <Grid item xs={12} sm={3}>
              <Typography className={classes.headers} gutterBottom variant="h6">
                Contact
              </Typography>
                <List >
                    <ListItem className={classes.listItem}>
                    <CallIcon/> &nbsp;<ListItemText primary={'(254) 717 25 25 75'} />
                    </ListItem>
                    <ListItem  className={classes.listItem}>
                    <LocationOnIcon/> &nbsp;<ListItemText primary={'Ridgeways Kiambu Kenya'} />
                    </ListItem>
                    <ListItem   className={classes.listItem}>
                    <EmailIcon/>&nbsp; <ListItemText primary={' info@bidspesa.com'} />
                    </ListItem>
                </List>
            </Grid> 
            <Grid item xs={12} sm={3}>
              <Typography className={classes.headers} gutterBottom variant="h6">
                Social Media
              </Typography>
                <List >
                    <ListItem  className={classes.listItem}>
                        <FacebookIcon />&nbsp;<ListItemText primary={'Facebook'} />
                    </ListItem>
                    <ListItem  className={classes.listItem}>
                       <TwitterIcon/> &nbsp;<ListItemText primary={'Twitter'} />
                    </ListItem>
                    <ListItem   className={classes.listItem}>
                        <YouTubeIcon/> &nbsp;<ListItemText primary={'YouTube'} />
                    </ListItem>
                    <ListItem   className={classes.listItem}>
                        <InstagramIcon/>&nbsp; <ListItemText primary={'Instagram'} />
                    </ListItem>
                </List>
            </Grid> 
            <Grid item xs={12} sm={3}>
              <Typography className={classes.headers} gutterBottom variant="h6">
                Licence
              </Typography>
                <List>
                    <ListItem className={classes.listItem}>
                      <Typography variant="body1" color="inherit">
                        The Operator of this website, is licensed and regulated by the Auctioneers Board of Kenya under License number 0000000.
                      </Typography>
                    </ListItem>
                </List>
            </Grid> 
            </Grid>
            <hr/>
            <Toolbar>
              
              <Typography variant="body1" className={classes.center} color="inherit">
              Copyright © 2021 bidspesa limited.  &nbsp;&nbsp;All rights reserved ® <br/>
              Version 1.0.1 2021-09-24
              </Typography>
            </Toolbar>
          </Container>
    )
}
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InputIcon from "@mui/icons-material/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Logo from "./Logo";
import { logout } from "src/actions/auth";
import {AuthService} from 'src/api/AuthService';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    (async () => dispatch(logout()))().then(() => {
      AuthService.deleteToken();
      navigate("/login");
    });
  }
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit" size="large">
            <Tooltip title="Notifications" arrow>
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </Tooltip>
          </IconButton>
          <IconButton color="inherit" size="large" onClick={handleLogout}>
            <Tooltip title="Logout" arrow>
              <InputIcon />
            </Tooltip>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;

import { useEffect, useState, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button,
  ListItem
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
  Star as StarIcon
  /* AlertCircle as AlertCircleIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Lock as LockIcon,
  Settings as SettingsIcon, */
} from "react-feather";
import NavItem from "./NavItem";
import { LOGOUT } from "src/constants";
import { AuthService } from "src/api/AuthService";

const usertmp = {
  avatar: "/static/images/avatars/avatar_1.png",
  jobTitle: "Admin",
  name: "Mr John Doe",
};

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/app/categories",
    icon: UsersIcon,
    title: "Categories",
  },
  {
    href: "/app/products",
    icon: ShoppingBagIcon,
    title: "Products",
  },
  {
    href: "/app/bids",
    icon: ShoppingBagIcon,
    title: "Bids",
  },
  {
    href: '/app/expired-bids',
    icon: ShoppingBagIcon,
    title: "Expired Bids"
  },
  {
    href: '/app/wins',
    icon: StarIcon,
    title: "Winnings",
  },
  {
    href: '/app/admins',
    icon: UsersIcon,
    title: "Admins"
  },
];

const SideBarBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: "medium",
  justifyContent: "flex-start",
  letterSpacing: 0,
  py: 1.25,
  textTransform: "none",
  width: "100%",
}));

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [authenticatedUser, setAuthenticatedUser] = useState({fullname: '', role: ''});

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const normalizedUser = useMemo(() => user, [user]);
  useEffect(() => {
    if(normalizedUser) {
      setAuthenticatedUser(normalizedUser);
    } else if(AuthService.getAuthenticatedUser()) {
      setAuthenticatedUser(AuthService.getAuthenticatedUser());
    }
  }, [normalizedUser]);

  function handleLogout() {
    dispatch({ type: LOGOUT });
  }

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={usertmp.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {authenticatedUser.fullname}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {authenticatedUser.role}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              btn={SideBarBtn}
            />
          ))}
          <ListItem
            disableGutters
            sx={{
              display: "flex",
              py: 0,
            }}
          >
            <SideBarBtn
              sx={{
                "& svg": {
                  mr: 1,
                },
              }}
              onClick={handleLogout}
            >
              <LogOutIcon size="20" />
              <span>
                Logout
              </span>
            </SideBarBtn>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: "background.default",
          m: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        ></Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;

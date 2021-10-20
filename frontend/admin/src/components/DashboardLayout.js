import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from 'src/actions/auth';
import {AuthService} from 'src/api/AuthService';


const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const DashboardLayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const DashboardLayout = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    console.log("DashBoardLayout ran", authenticated);
    if(authenticated === false) {
      console.log("authenticted global is false ", authenticated);
      (async () => dispatch(logout()))().then(() => {
        AuthService.deleteToken();
        navigate("/login");
      });
    }
  }, [authenticated]);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;

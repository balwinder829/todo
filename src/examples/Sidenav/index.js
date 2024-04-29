 

import React ,{ useEffect, useState } from "react";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

//  T0 Do React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

//  T0 Do React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import getAuthToken from "../../API/ExportApi"

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

//  T0 Do React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import { useGoogleLogin } from "@react-oauth/google"
import Settings from "layouts/setting/Settings";
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import ExportApi from "../../API/ExportApi";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const clientId = "91957916160-8q5utu0s8lh4t8vasku906vu8tuvl65f.apps.googleusercontent.com";
  const secret = "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";
  const [controller, dispatch] = useMaterialUIController();
  const token = useSelector((state) => state.token);
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();

  const [authToken, setAuthToken] = useState("");
  const collapseName = location.pathname.replace("/", "");
  const [open1, setOpen1] = React.useState(false);
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }
  const handleClose1 = () => {
    setOpen1(!open1);
  };
  const closeSidenav = () => setMiniSidenav(dispatch, true);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log({ codeResponse });
      setAuthToken(codeResponse.code);
      ExportApi.getAuthToken({code:codeResponse.code}, token)
    },
    accessType: 'offline',
    flow: "auth-code",
  });

  const getToken = async () => {
    const params = new URLSearchParams();
    params.append("code", authToken);
    params.append("client_id", clientId);
    params.append("client_secret", secret);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("grant_type", "authorization_code");

    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("response getToken", response.data);
    } catch (error) {
      // console.error("error", error.response.data);
    }
  };

  React.useEffect(() => {
    if (authToken) {
      getToken();
    }
  }, [authToken]);
  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>

      ) : (
        <NavLink key={key} to={route}>
          {key=="Gmail"? <SidenavCollapse onClick={login} name={name} icon={icon} active={key === collapseName} />:key=="Settings"? <SidenavCollapse onClick={handleClose1} name={name} icon={icon} active={key === collapseName} />: <SidenavCollapse name={name} icon={icon} active={key === collapseName} />}
          {/* <SidenavCollapse name={name} icon={icon} active={key === collapseName} /> */}
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {"To Do"}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      <MDBox p={2} mt="auto">

      </MDBox>
      <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="min-w-96" id="alert-dialog-title">
            Settings
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid item xs={12} md={6} lg={4}>
                <Settings />
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Close</Button>
            {/* <Button onClick={handleClose1} autoFocus>
              Done
            </Button> */}
          </DialogActions>
        </Dialog>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;

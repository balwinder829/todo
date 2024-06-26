
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import CreateToDo from "layouts/createtodo";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "TO Do List",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/todolist",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Create TO Do ",
    key: "todo",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/CreateToDo",
    component: <CreateToDo />,
  },
  {
    type: "collapse",
    name: "Gmail Authentication",
    key: "Gmail",
    icon: <Icon fontSize="small">Gmail</Icon>,
    route: "#",
    // component: < />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "Settings",
    icon: <Icon fontSize="small">Settings</Icon>,
    route: "#",
    // component: < />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];
export const routespublic = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes
// export default routespublic;

import React from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import Copyright from "../../components/Copyright";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import ContactUs from "./ContactUs";
import Balance from "./Balance";
import BankInfo from "./BankInfo";
import Message from "./Message";
import Profile from "./Profile";
import Bills from "./Bills";
import VerifyEmailMessage from "./VerifyEmailMessage";
import { connect } from "react-redux";

let theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    background: "#eaeff1",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6, 4),
    },
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
};

function Admin(props) {
  const { classes, user } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} classes={classes} />
          {user.emailVerified ? (
            <Switch>
              <Route
                path={`/`}
                component={(props) => <Balance classes={classes} {...props} />}
                exact
              />
              <Route
                path={`/balance`}
                component={(props) => <Balance classes={classes} {...props} />}
                exact
              />

              <Route
                path={`/bank`}
                component={(props) => <BankInfo classes={classes} {...props} />}
                exact
              />

              <Route
                path={`/orders`}
                component={(props) => <BankInfo classes={classes} {...props} />}
                exact
              />
              <Route
                path={`/messages`}
                component={(props) => <Message classes={classes} {...props} />}
                exact
              />
              <Route
                path={`/bills`}
                component={(props) => <Bills classes={classes} {...props} />}
                exact
              />
              <Route
                path={`/profile`}
                component={(props) => <Profile classes={classes} {...props} />}
                exact
              />
              <Route
                path={`/contact-us`}
                component={(props) => (
                  <ContactUs classes={classes} {...props} />
                )}
                exact
              />
            </Switch>
          ) : (
            <VerifyEmailMessage classes={classes}/>
          )}

          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Admin));

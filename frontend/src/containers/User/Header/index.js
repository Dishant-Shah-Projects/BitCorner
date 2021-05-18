import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import firebase from "../../Firebase";
import MarketPrice from '../MarketPrice/MarketPrice';

// const lightColor = "rgba(255, 255, 255, 0.7)";

// const styles = (theme) => ({
//   menuButton: {
//     marginLeft: -theme.spacing(1),
//   },
//   iconButtonAvatar: {
//     padding: 4,
//   },
//   link: {
//     textDecoration: "none",
//     color: lightColor,
//     "&:hover": {
//       color: theme.palette.common.white,
//     },
//   },
//   button: {
//     borderColor: lightColor,
//   },
// });

function CommonHeader(props) {
  const { classes, onDrawerToggle, user } = props;

  return (
    <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Hidden smUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item>
            <Tooltip title="Market price">
                  <MarketPrice/>
              </Tooltip>
            </Grid>
          <Grid item xs />
          {/* <Grid item>
            <Tooltip title="Alerts • No alerts">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid> */}
        
          <Grid item>
            <Tooltip title="display name">
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                {user.displayName}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="profile pic">
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src={user.photoURL} alt="My Avatar" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                className={classes.iconButtonAvatar}
                onClick={() => {
                  window.location = "/";
                  firebase.auth().signOut();
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, null)(CommonHeader);

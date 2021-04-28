import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes, name, helperText } = props;

  return (
    <>
      {name && (
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  {name}
                </Typography>
              </Grid>
              {helperText && (
                <Grid item>
                  <Tooltip title={helperText}>
                    <IconButton color="inherit">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  helperText: PropTypes.string,
};

export default withStyles(styles)(Header);

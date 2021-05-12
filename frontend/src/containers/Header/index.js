import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HelpIcon from "@material-ui/icons/Help";
import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Header from '../Header';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <RouterLink
            color="inherit"
            to="/"
            className="MuiButton-root MuiButton-colorInherit"
            style={{ textDecoration: "none", flexGrow: 1 }}
          >
            <Typography variant="h6">Bit Corner</Typography>
          </RouterLink>

          {props.children}
          <Button color="inherit">
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

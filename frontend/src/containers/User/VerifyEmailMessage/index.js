import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";
import { connect } from "react-redux";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
});

function Content(props) {
  const { classes, user } = props;
  const [resent, setresent] = useState(false);

  useEffect(() => {
    user.sendEmailVerification();
  });

  const reSend = () => {
    user.sendEmailVerification();
    setresent(true);
    setTimeout(() => {
      setresent(false);
    }, 30000);
  };
  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center">
          Please verify your email. Verification email has been sent to{" "}
          {user?.email}. If this is not your email then signout and
          signin/signup with your active email id.
          {!resent && (
            <span>
              Didn't receive verification email?{" "}
              <button onClick={reSend}>Resend Verification Email</button>
            </span>
          )}
        </Typography>
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(
  mapStateToProps,
  null
)((props) => (
  <ComponentWrapper
    name="Verify Email"
    helperText="verify email to continue using Bit Corner"
    Component={withStyles(styles)(Content)}
    {...props}
  />
));

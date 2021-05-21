import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "../../../components/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import axios from "axios";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import ComponentWrapper from "../ComponentWrapper";
import { requestUserInfo } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  subSelection: {
    marginLeft: theme.spacing(4),
  },
  subSubSelection: {
    marginLeft: theme.spacing(10),
  },
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  contentWrapper: {
    margin: "40px 16px",
  },
}));
export const Content = (props) => {
  const { userInfo, onRequestUserInfo } = props;
  const classes = useStyles();

  const {
    errors,
    setErrors,
    formSubmit,
    handleInputChange,
    isFormValid,
    isValid,
    setFieldValid,
    setValues,
    values,
  } = useForm(
    { nickname: userInfo?.userInfo?.nickName },
    { nickname: userInfo?.userInfo?.nickName ? true : false }
  );
  const onFormSubmit = (event) => {
    formSubmit(event, () => {
      console.log("values", values);
      axios.put(`user?nickname=${values["nickname"]}`).then((response) => {
        onRequestUserInfo();
      });
    });
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <Typography component="h1" variant="h5">
          {userInfo?.isPending
            ? "Create New Nick Name"
            : "Update New Nick Name"}
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nick Name"
              name="nickname"
              onChange={handleInputChange}
              value={values["nickname"]}
              pattern="^[a-zA-Z0-9]{1,50}$"
              helperText="Please enter valid nickname of max length 50. You can use a-z, A-Z, 0-9 characters."
              error={errors["nickname"]}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isFormValid}
            >
              Save
            </Button>
          </Grid>
        </form>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUserInfo: () => dispatch(requestUserInfo()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => (
  <ComponentWrapper
    name="Update Nick Name"
    helperText="Please update your nickname"
    Component={Content}
    {...props}
  />
));

import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TextField from "../../../components/TextField";
import { connect } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";

function DateFilter(props) {
  const {filter} = props;

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
  } = useForm({ startDate: "", endDate:"" }, { startDate: true, endDate: true });

  const onFormSubmit = (event) => {
    formSubmit(event, () => {
        filter(values)
    });
  };
  return (
    <Grid container spacing={3}>
    <Grid item xs={3}>
      <TextField
        required
        type="date"
        margin="dense"
        name="startDate"
        fullWidth
        onChange={handleInputChange}
        value={values["startDate"]}
        error={errors["startDate"]}
      />
    </Grid>
    <Grid item xs={3}>
      <TextField
        required
        type="date"
        margin="dense"
        name="endDate"
        fullWidth
        onChange={handleInputChange}
        value={values["endDate"]}
        error={errors["endDate"]}
      />
    </Grid>
    <Grid item xs={3}>
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onClick = {onFormSubmit}
      >
        Filter
      </Button>
    </Grid>
  </Grid>
  );
}

export default DateFilter;

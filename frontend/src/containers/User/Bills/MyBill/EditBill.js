import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { requestBillInfo, requestCurrencyInfo } from "../action";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "../../../../components/TextField";
import { useForm } from "../../../../hooks/useForm";
import Select from "../../../../components/Select";
import InputLabel from "@material-ui/core/InputLabel";
const styles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  center: {
    justifyContent: "center",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  table: {
    minWidth: 600,
  },
}));

function EditBillModal(props) {
  const {
    classes,
    onRequestBankInfo,
    currencies,
    user,
    onrequestCurrencyInfo,
    onrequestBillInfo,
    bill,
  } = props;

  const [open, setOpen] = React.useState(false);
  const styling = styles();
  const formData = {
    ID: bill.id,
  };
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
    {
      Description: bill.description,
      target_currency: bill.target_currency,
      amount: bill.amount,
      duedate: bill.dueDate,
    },
    {
      Description: false,
      target_currency: false,
      amount: false,
      duedate: false,
    }
  );
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleInput = (event) => {
    formSubmit(event, () => {
      console.log("values", values);
      var date = new Date(values["duedate"]);
      let val =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      Axios.post(
        `/bill?&ID=${bill.id}&Description=${values["Description"]}&target_currency=${values["target_currency"]}&amount=${values["amount"]}&duedate=${val}`,
        values
      ).then((response) => {
        if (response.status === 200) {
          console.log("Successfully UPDATED Bank Account");
          setOpen(false);
          onrequestBillInfo();
        } else {
          console.log("Failed");
        }
      });
    });
  };

  useEffect(() => {
    onrequestCurrencyInfo();
  }, []);
  let disabled = false;
  if (bill.status === "Paid") {
    disabled = true;
  }
  return (
    <>
      <Button
        style={{ margin: "0 auto", display: "flex" }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        disabled={disabled}
      >
        <EditIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          className={styling.root}
          noValidate
          autoComplete="off"
          onSubmit={handleInput}
        >
          <DialogTitle id="form-dialog-title">Pay Bill</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Update out the details</DialogContentText>
            <TextField
              autoFocus
              required
              pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
              helperText="Please enter a valid Description"
              margin="dense"
              id="country"
              label="Description"
              name="Description"
              fullWidth
              onChange={handleInputChange}
              value={values["Description"]}
              error={errors["Description"]}
            />
            <Select
              required
              margin="dense"
              id="country"
              label="Currency"
              name="target_currency"
              fullWidth
              options={currencies}
              valueKey="id"
              displayKey="name"
              helperText="Please select atleast one"
              onChange={handleInputChange}
              value={values["target_currency"]}
              error={errors["target_currency"]}
            />
            <TextField
              required
              pattern="^[+]?([.]\d+|\d+([.]\d\d?)?)$"
              helperText="Please enter a valid Amount"
              margin="dense"
              name="amount"
              label="Amount"
              fullWidth
              onChange={handleInputChange}
              value={values["amount"]}
              error={errors["amount"]}
            />
            <InputLabel id="Data">Due Date</InputLabel>
            <TextField
              required
              type="date"
              margin="dense"
              name="duedate"
              fullWidth
              onChange={handleInputChange}
              value={values["duedate"]}
              error={errors["duedate"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={!isFormValid}>
              Add Bill
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currencies: state.currency.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestCurrencyInfo: () => dispatch(requestCurrencyInfo()),
    onrequestBillInfo: () => dispatch(requestBillInfo()),
  };
};

EditBillModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditBillModal));

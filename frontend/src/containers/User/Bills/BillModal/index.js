import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { requestBillInfo } from "../action";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import TextField from "../../../../components/TextField";
import { useForm } from "../../../../hooks/useForm";
import { requestBankInfo } from "../../actions";
import CurrencyDropdown from "../../CurrencyDropdown/index";
import InputLabel from "@material-ui/core/InputLabel";

const styles = (theme) => ({
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
});

function BillModal(props) {
  const { classes, onRequestBankInfo, onrequestBillInfo, bankInfo } = props;
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => setOpen(true);

  const {
    errors,
    setErrors,
    formSubmit,
    handleInputChange,
    isFormValid,
    isValid,
    setFieldValid,
    setValues,
    setIsFormValid,
    values,
  } = useForm(
    {
      toEmail: "",
      Description: "",
      target_currency: bankInfo?.data?.primaryCurrencyId,
      amount: "",
      duedate: "",
    },
    {
      toEmail: false,
      Description: false,
      target_currency: true,
      amount: false,
      duedate: false,
    }
  );

  const handleClose = () => {
    setValues({
      toEmail: "",
      Description: "",
      target_currency: bankInfo?.data?.primaryCurrencyId,
      amount: "",
      duedate: "",
    });
    setFieldValid({
      toEmail: false,
      Description: false,
      target_currency: true,
      amount: false,
      duedate: false,
    });
    setIsFormValid(false);
    setOpen(false);
  };

  const handleInput = (event) => {
    formSubmit(event, () => {
      Axios.put(
        `/bill?toEmail=${values["toEmail"]}&Description=${values["Description"]}&target_currency=${values["target_currency"]}&amount=${values["amount"]}&duedate=${values["duedate"]}`,
        values
      ).then((response) => {
        onrequestBillInfo();
        handleClose();
      });
    });
  };

  useEffect(() => {
    onRequestBankInfo();
  }, []);

  return (
    <div>
      <div className={classes.contentWrapper}>
        <div>
          <Button
            style={{ margin: "0 auto", display: "flex" }}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            Add Bill
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleInput}
          >
            <DialogTitle id="form-dialog-title">Add Bill</DialogTitle>
            <DialogContent>
              <DialogContentText>Please Fill out the details</DialogContentText>
              <TextField
                autoFocus
                required
                pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                helperText="Please enter a valid Email"
                margin="dense"
                label="Pay Email"
                name="toEmail"
                fullWidth
                onChange={handleInputChange}
                value={values["toEmail"]}
                error={errors["toEmail"]}
              />
              <TextField
                required
                margin="dense"
                id="country"
                pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                helperText="Please enter a valid Description"
                label="Description"
                name="Description"
                fullWidth
                onChange={handleInputChange}
                value={values["Description"]}
                error={errors["Description"]}
              />
              <CurrencyDropdown
                isCrypto={true}
                required
                margin="dense"
                id="currency"
                label="Currency"
                name="target_currency"
                fullWidth
                helperText="Please select atleast one"
                onChange={handleInputChange}
                value={values["target_currency"]}
                error={errors["target_currency"]}
              />
              <TextField
                required
                pattern="^(\d{1,9}|\d{0,9}\.\d{1,9})$"
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
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bankInfo: state.bank.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestBillInfo: () => dispatch(requestBillInfo()),
    onRequestBankInfo: () => dispatch(requestBankInfo()),
  };
};

BillModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BillModal));

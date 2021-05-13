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
import PaymentIcon from "@material-ui/icons/Payment";
import CurrencyDropdown from "../../CurrencyDropdown/index";

import { useForm } from "../../../../hooks/useForm";

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

function PayBillModal(props) {
  const {
    classes,
    currencies,
    user,
    onrequestCurrencyInfo,
    onrequestBillInfo,
    bill,
    bankInfo,
  } = props;
  console.log(currencies);
  const [open, setOpen] = React.useState(false);
  const styling = styles();
  let id = bankInfo?.data?.primaryCurrencyId;

  console.log("#######");
  console.log(bill);

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
      target_currency: bill?.targetCurrency?.id,
    },
    {
      target_currency: true,
    }
  );

  const calculateamount = (target, pay) => {
    if (target === pay) {
      return bill.amount;
    }
    let amount = 0;
    let curtar = null;
    let curpay = null;

    for (var i = 0; i < currencies.length; i++) {
      // look for the entry with a matching `code` value
      if (currencies[i].id == target) {
        curtar = currencies[i];
        // we found it
        // obj[i].name is the matched result
      }
      if (currencies[i].id == pay) {
        curpay = currencies[i];
        // we found it
        // obj[i].name is the matched result
      }
    }

    amount =
      (bill.amount / curtar.conversionRate) * curpay.conversionRate * 1.01;

    return amount;
  };

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onFormSubmit = (event) => {
    formSubmit(event, () => {
      Axios.put(
        `/bill/pay?&ID=${bill.id}&pay_currency=${values["target_currency"]}`,
        null
      ).then((response) => {
        if (response.status === 200) {
          console.log("Successfully UPDATED Bank Account");
          setOpen(false);
          onrequestBillInfo();
        }
      });
    });
  };

  useEffect(() => {
    onrequestCurrencyInfo();
  }, []);

  return (
    <div>
      <div className={styling.contentWrapper}>
        <div>
          <Button
            style={{ margin: "0 auto", display: "flex" }}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            <PaymentIcon />
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form
            className={styling.root}
            noValidate
            autoComplete="off"
            onSubmit={onFormSubmit}
          >
            <DialogTitle id="form-dialog-title">Pay Bill</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please Pay or Cancle the Bill
              </DialogContentText>

              <CurrencyDropdown
                isCrypto={true}
                required
                margin="dense"
                id="country"
                label="Currency"
                name="target_currency"
                fullWidth
                helperText="Please select atleast one"
                onChange={handleInputChange}
                value={values["target_currency"]}
                error={errors["target_currency"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
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
    user: state.user,
    currencies: state.currency.currencies,
    bankInfo: state.bank.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestCurrencyInfo: () => dispatch(requestCurrencyInfo()),
  };
};

PayBillModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PayBillModal));

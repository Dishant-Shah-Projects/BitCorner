import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { requestBillPayInfo } from "../action";
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
    currency,
    onrequestBillPayInfo,
    bill,
    bankInfo,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [targetCurrency, setTargetCurrency] = React.useState({});
  const styling = styles();

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
          values["target_currency"]=bill?.targetCurrency?.id;
          onrequestBillPayInfo();
        }
        else{
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    let targetCurrencyObj = currency?.currencies?.find(item => item.id === bill?.targetCurrency?.id);
    setTargetCurrency(targetCurrencyObj);
  }, [bill]);

  let disabled = false
  if(bill.status==="Paid" || bill.status==="Cancelled"||bill.status==="Rejected"){
    disabled = true
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
            <PaymentIcon />
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
            onSubmit={onFormSubmit}
          >
            <DialogTitle id="form-dialog-title">Pay Bill</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <b>Please Pay the bill!</b>
              </DialogContentText>
              <h4>Pay To: {bill?.fromUser?.userName}</h4>
              <h4>Description: {bill?.description}</h4>
              <h4>Target Currency Amount: {bill?.amount} </h4>
              <h4>Target Currency: {targetCurrency?.name}</h4>
              {
                bill?.targetCurrency?.id != 6 && values["target_currency"] != 6 && targetCurrency?.id !== values["target_currency"] && <h4>Exchange Rate: {currency?.currencies?.find(item => item.id == values["target_currency"]).conversionRate / targetCurrency?.conversionRate}</h4>
              }    
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
                Pay Bill
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        </>
  );
}

const mapStateToProps = (state) => {
  return {
    bankInfo: state.bank.bankInfo,
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestBillPayInfo: () => dispatch(requestBillPayInfo())
  };
};

PayBillModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PayBillModal));

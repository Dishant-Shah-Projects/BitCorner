import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { requestCurrencyInfo } from "../Bills/action";
import { requestOrderInfo } from "../actions.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Axios from "axios";
import CurrencyDropdown from "../CurrencyDropdown/index";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "../../../components/TextField";
import { useForm } from "../../../hooks/useForm";
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

function EditOrderModal(props) {
  const {
    classes,
    currencies,
    onrequestCurrencyInfo,
    order,
    onrequestOrderInfo,
  } = props;
  const [open, setOpen] = React.useState(false);

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
      type: order.type,
      priceType: order.priceType,
      quantity: parseFloat(order.quantity).toFixed(8),
      limitPrice: order.limitPrice,
      currencyId: order.currencyId,
    },
    {}
  );
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const FormSubmit = (event) => {
    formSubmit(event, () => {
      Axios.put(`/order/update?&orderId=${order.id}`, values).then(
        (response) => {
          if (response.status === 200) {
            setOpen(false);
            onrequestOrderInfo();
          } else {
          }
        }
      );
    });
  };

  // useEffect(() => {
  //   onrequestOrderInfo();
  // }, []);
  let disabled = false;
  if (order.status == "Fulfilled" || order.status == "Cancelled") {
    disabled = true;
  }
  return (
    <>
      <div>
        <Button
          style={{ margin: "0 auto", display: "flex" }}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          disabled={disabled}
        >
          <EditIcon />
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
          onSubmit={FormSubmit}
        >
          <DialogTitle id="form-dialog-title">Edit your order</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Update your order the details
            </DialogContentText>
            <InputLabel id="type">Type</InputLabel>
            <RadioGroup
              aria-label="Type"
              name="type"
              value={values["type"]}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value="SELL" control={<Radio />} label="Sell" />
              <FormControlLabel value="BUY" control={<Radio />} label="Buy" />
            </RadioGroup>

            <InputLabel id="type">Price Type</InputLabel>
            <RadioGroup
              aria-label="PriceType"
              name="priceType"
              value={values["priceType"]}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                value="LIMIT"
                control={<Radio />}
                label="LIMIT"
              />
              <FormControlLabel
                value="MARKET"
                control={<Radio />}
                label="MARKET"
              />
            </RadioGroup>

            <TextField
              required
              fullWidth
              margin="dense"
              name="quantity"
              label="Quantity"
              pattern="^(\d{1,9}|\d{0,9}\.\d{1,9})$"
              helperText="Please enter valid quantity"
              fullWidth
              onChange={handleInputChange}
              value={values["quantity"]}
              error={errors["quantity"]}
            />

            <TextField
              required
              fullWidth
              margin="dense"
              name="limitPrice"
              label="LimitPrice"
              pattern="^(\d{1,9}|\d{0,9}\.\d{1,9})$"
              helperText="Please enter valid limit price"
              disabled={values["priceType"] === "MARKET"}
              fullWidth
              onChange={handleInputChange}
              value={values["limitPrice"]}
              error={errors["limitPrice"]}
            />

            <CurrencyDropdown
              isCrypto={false}
              required
              margin="dense"
              label="Currency"
              name="currencyId"
              fullWidth
              helperText="Please select atleast one"
              onChange={handleInputChange}
              value={values["currencyId"]}
              error={errors["currencyId"]}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              disabled={!isFormValid}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Update Order
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestOrderInfo: () => dispatch(requestOrderInfo()),
  };
};

EditOrderModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditOrderModal));

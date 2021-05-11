import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import ComponentWrapper from "../ComponentWrapper";
import { requestBillInfo,requestCurrencyInfo } from "../Bills/action";
import { requestOrderInfo, requestBankInfo } from "../actions.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from "axios";
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import TextField from "../../../components/TextField";
import { useForm } from "../../../hooks/useForm";
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

function EditOrderModal(props) {
  const { classes, currencies, onrequestCurrencyInfo, order, onrequestOrderInfo} = props;
  console.log(currencies);
  console.log(order);
  const [open, setOpen] = React.useState(false);
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
    {  type:order.type,priceType:order.priceType,quantity:order.quantity,limitPrice:order.limitPrice,currencyId:order.currencyId},
    {  }
  );
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // const handleInput = (event) => {
  //   event.preventDefault();
  //   console.log("FormData", formData);
  //   Axios.post(`/bill?&ID=${bill.id}&Description=${formData["Description"]}&target_currency=${formData["target_currency"]}&amount=${formData["amount"]}&duedate=${formData["duedate"]}`,null).then((response) => {
  //     if (response.status === 200) {
  //       console.log("Successfully UPDATED Bank Account");
  //       setOpen(false);
  //       onrequestBillInfo();
  //     } else {
  //       console.log("Failed");
  //     }
  //   });
  // };
  const FormSubmit = (event) => {
    formSubmit(event, () => {
      console.log("values", values);
      console.log(order.id);
      Axios.put(`/order/update?&orderId=${order.id}`,values)
      .then((response) => {
        if (response.status === 200) {
          console.log("Successfully UPDATED the order");
          setOpen(false);
          onrequestOrderInfo();
        } else {
          console.log("Failed to update the order");
        }
      })
    });
  };

  useEffect(() => {
    onrequestCurrencyInfo();
    onrequestOrderInfo();
  }, []);
  let disabled = false
  if(order.status=="Fulfilled" || order.status=="Cancelled"){
    disabled = true
  }
  return (
<div>
        <div className={styling.contentWrapper}>
          <div>
            <Button
              style={{ margin: "0 auto", display: "flex" }}
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
              disabled={disabled}
            >
              Edit Order
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
              onSubmit={FormSubmit}
            >
              <DialogTitle id="form-dialog-title">
                Edit your order
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please Update your order the details 
                </DialogContentText>
                <InputLabel id="type">Type</InputLabel>
                <Select
                    autoFocus
                    labelId="type"
                    id="Type"
                    name="type"
                    label="Type"
                    autoWidth
                    onChange={(e) => {
                        values[e.target.name] = e.target.value;
                      }}
                    value = {values["type"]}
                    errors={errors["type"]}
                    
                  >
                      <MenuItem value={"SELL"}>SELL</MenuItem>
                      <MenuItem value={"BUY"}>BUY</MenuItem>
                  </Select>
                  
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="PayEmail"
                  name="toEmail"
                  fullWidth
                  value = {values["toEmail"]}
                  errors={errors["toEmail"]}
                  onChange={handleInputChange}
                /> */}
                <TextField
                  
                  required
                  fullWidth
                  margin="dense"
                  id="priceType"
                  label="PriceType"
                  name="priceType"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["priceType"]}
                  error={errors["priceType"]}
                  
                />
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="target_currency"
                  label="target "
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                /> */}
                {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="target_currency"
                    label="target "
                    onChange={handleInputChange}
                    value = {values["target_currency"]}
                    errors={errors["target_currency"]}
                   
                  >
                    {currencies.map((row)=>
                    (
                      <MenuItem value={row.id}>{row.name}</MenuItem>
                    )
                    
                    )}
                </Select> */}
                <TextField
                  
                  required
                  fullWidth
                  margin="dense"
                  name="quantity"
                  label="Quantity"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["quantity"]}
                  error={errors["quantity"]}
                  
                />
                <TextField
                  
                  required
                  fullWidth
                  margin="dense"
                  name="limitPrice"
                  label="LimitPrice"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["limitPrice"]}
                  error={errors["limitPrice"]}
                  
                />
                <TextField
                  
                  required
                  fullWidth
                  margin="dense"
                  name="currencyId"
                  label="CurrencyId"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["currencyId"]}
                  error={errors["currencyId"]}
                  
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary"disabled={!isFormValid}> 
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Update Order
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
    currencies :state.currency.currencies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    onrequestCurrencyInfo: ()  => dispatch(requestCurrencyInfo()),
    onrequestOrderInfo: () => dispatch(requestOrderInfo())
  };
};

EditOrderModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default (props) => (
//   <ComponentWrapper
//     name="Bank Account Details"
//     helperText="View and update your bank account information"
//     Component={connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(withStyles(styles)(Content))}
//     {...props}
//   />
// );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditOrderModal));
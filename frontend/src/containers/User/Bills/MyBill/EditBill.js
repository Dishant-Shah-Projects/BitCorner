import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import ComponentWrapper from "../ComponentWrapper";
import { requestBillInfo,requestCurrencyInfo } from "../action";
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
import TextField from "../../../../components/TextField";
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

function EditBillModal(props) {
  const { classes, onRequestBankInfo, currencies, user, onrequestCurrencyInfo,onrequestBillInfo,bill} = props;
  console.log(currencies);
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
    {  Description:bill.description,target_currency:bill.target_currency,amount:bill.amount,duedate:bill.dueDate},
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
  const handleInput = (event) => {
    formSubmit(event, () => {
      console.log("values", values);
      Axios.post(`/bill?&ID=${bill.id}&Description=${values["Description"]}&target_currency=${values["target_currency"]}&amount=${values["amount"]}&duedate=${values["duedate"]}`,values)
      .then((response) => {
        if (response.status === 200) {
          console.log("Successfully UPDATED Bank Account");
          setOpen(false);
          onrequestBillInfo();
        } else {
          console.log("Failed");
        }
      })
    });
  };

  useEffect(() => {
    onrequestCurrencyInfo();
  }, []);
  let disabled = false
  if(bill.status=="Paid"){
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
              Add Bill
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
              onSubmit={handleInput}
            >
              <DialogTitle id="form-dialog-title">
                Pay Bill
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please Update out the details 
                </DialogContentText>
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
                  autoFocus
                  required
                  margin="dense"
                  id="country"
                  label="Description"
                  name="Description"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["Description"]}
                  errors={errors["Description"]}
                  
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
                <Select
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
                </Select>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="amount"
                  label="amount"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["amount"]}
                  errors={errors["amount"]}
                  
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="duedate"
                  type="date"
                  label="duedate"
                  fullWidth
                  onChange={handleInputChange}
                  value = {values["duedate"]}
                  errors={errors["duedate"]}
                  
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary"disabled={!isFormValid}> 
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
    currencies :state.currency.currencies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    onrequestCurrencyInfo: ()  => dispatch(requestCurrencyInfo()),
    onrequestBillInfo: () => dispatch(requestBillInfo())
  };
};

EditBillModal.propTypes = {
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
)(withStyles(styles)(EditBillModal));
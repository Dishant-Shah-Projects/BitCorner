import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { requestBillInfo,requestCurrencyInfo } from "../action";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import TextField from "../../../../components/TextField";
import { useForm } from "../../../../hooks/useForm";
import { requestBankInfo } from "../../actions";
import CurrencyDropdown from "../../CurrencyDropdown/index"
import InputLabel from '@material-ui/core/InputLabel';
import { TrendingUpRounded } from "@material-ui/icons";

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

function BillModal(props) {
  const { classes, onRequestBankInfo, currencies, user, onrequestCurrencyInfo,onrequestBillInfo,bankInfo} = props;
  console.log(currencies);
  const [open, setOpen] = React.useState(false);
  const styling = styles();


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
    values,
  } = useForm(
    { toEmail: "", Description:"",target_currency:bankInfo?.data?.primaryCurrencyId,amount:"",duedate:""},
    {  toEmail:false, Description:false, target_currency:true,amount:false,duedate:false}
  );
  const handleClose = () =>{ 
    values["toEmail"]="";
    values["Description"]="";
    values["target_currency"]=bankInfo?.data?.primaryCurrencyId;
    values["amount"]=0;
    values["duedate"]=Date.now()
    setOpen(false);
  }
  const handleInput = (event) => {
    formSubmit(event, () => {
      console.log("values", values);
      
      var date = new Date(values["duedate"]); 
      let val =(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
      Axios.put(`/bill?&toEmail=${values["toEmail"]}&Description=${values["Description"]}&target_currency=${values["target_currency"]}&amount=${values["amount"]}&duedate=${val}`,values)
        .then((response) => {
          if (response.status === 200) {
            console.log("Successfully Added Bank Account");
            setOpen(false);
            values["toEmail"]="";
            values["Description"]="";
            values["target_currency"]=bankInfo?.data?.primaryCurrencyId;
            values["amount"]=0;
            values["duedate"]=Date.now()
            onrequestBillInfo();
          } else {
            console.log("Failed");
          }
        });
        })

  };

  useEffect(() => {
    onrequestCurrencyInfo();
    onRequestBankInfo();
    
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
                Add Bill
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please Fill out the details 
                </DialogContentText>
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
                  value = {values["toEmail"]}
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
                  value = {values["Description"]}
                  error={errors["Description"]}
                  
                />
                  <CurrencyDropdown
                  isCrypto = {TrendingUpRounded}
                  required
                  margin="dense"
                  id="currency"
                  label="Currency"
                  name="target_currency"
                  fullWidth
                  helperText="Please select atleast one"
                  onChange={handleInputChange}
                  value = {values["target_currency"]}
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
                  value = {values["amount"]}
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
                  value = {values["duedate"]}
                  error={errors["duedate"]}
                  
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" > 
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
    user: state.user,
    currencies :state.currency.currencies,
    bankInfo:state.bank.bankInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    onrequestCurrencyInfo: ()  => dispatch(requestCurrencyInfo()),
    onrequestBillInfo: () => dispatch(requestBillInfo()),
    onRequestBankInfo: () => dispatch(requestBankInfo())
  };
};

BillModal.propTypes = {
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
)(withStyles(styles)(BillModal));

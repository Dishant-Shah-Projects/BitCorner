import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import ComponentWrapper from "../ComponentWrapper";
import { requestBillInfo,requestCurrencyInfo } from "../action";
import TextField from "@material-ui/core/TextField";
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
  const { classes, onRequestBankInfo, currencies, user, onrequestCurrencyInfo,onrequestBillInfo,bill} = props;
  console.log(currencies);
  const [open, setOpen] = React.useState(false);
  const styling = styles();
  const formData = {
    ID: bill.id,
  };

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleInput = (event) => {
    event.preventDefault();
    console.log("FormData", formData);
    Axios.put(`/bill/pay?&ID=${bill.id}&pay_currency=${formData["target_currency"]}&amount=${formData["amount"]}`,null).then((response) => {
      if (response.status === 200) {
        console.log("Successfully UPDATED Bank Account");
        setOpen(false);
        onrequestBillInfo();
      } else {
        console.log("Failed");
      }
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
              <PaymentIcon/>
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
                  Please Pay or Cancle the Bill
                </DialogContentText>

                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="PayEmail"
                  name="toEmail"
                  fullWidth
                  value={bill.toEmail}
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                /> */}
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="country"
                  label="Description"
                  name="Description"
                  fullWidth
                  value={bill.description}
                  onChange={(e) => (formData[e.target.name] = e.target.value)}
                /> */}
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
                    value={bill.target_currency}
                    onChange={(e) => (formData[e.target.name] = e.target.value)}
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
                  value={bill.amount}
                  onChange={(e) => (formData[e.target.name] = e.target.value)}
                />
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="duedate"
                  label="duedate"
                  fullWidth
                  value={bill.dueDate}
                  onChange={(e) => (formData[e.target.name] = e.target.value)}
                /> */}
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
    currencies :state.currency.currencies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    onrequestCurrencyInfo: ()  => dispatch(requestCurrencyInfo()),
    onrequestBillInfo: () => dispatch(requestBillInfo())
  };
};

PayBillModal.propTypes = {
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
)(withStyles(styles)(PayBillModal));
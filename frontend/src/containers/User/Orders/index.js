import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from '../ComponentWrapper';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { requestOrderInfo, requestBankInfo } from "../actions.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CurrencyDropdown from "../CurrencyDropdown/index"
import Axios from "axios";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },

  block: {
    display: "block",
  },
  
  contentWrapper: {
    margin: "40px 16px",
  },
});

function Content(props) {
  const { classes , orderInfo, error, onRequestOrderInfo, onRequestBankInfo, bankInfo } = props;
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const styling = styles();
  const formData = {};
 
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleType = (e) => {
    // setType(e.target.value);
    formData[e.target.name] = e.target.value;
    
  }
  const handleInput = (event) => {
    event.preventDefault();

    console.log("FormData", formData);
    
    Axios.put("/order", formData).then((response) => {
      if (response.status === 200) {
        console.log("Successfully Added Order");
        setOpen(false);
        window.location.reload(false);
      } else {
        console.log("Failed");
      }
    });
  };

  useEffect(() => {
    onRequestOrderInfo();
    onRequestBankInfo();
  }, []);

  return (
    <div>
      {bankInfo?.status === 200 ? (
    <div>
      <div className={styling.contentWrapper}>
          <div>
            <Button
              style={{ margin: "0 auto", display: "flex" }}
              variant="outlined"
              color="primary" 
              onClick={handleClickOpen}>
              Place a new order
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
                Place your Order
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Place your order to SELL/BUY here.
                </DialogContentText>

                <InputLabel id="type_test">Type</InputLabel>
                <Select
                  required
                  labelId="type_test"
                  id="type_test-select"
                  name="type"
                  value={type}
                  onChange={handleType}
                >
                  <MenuItem value={"SELL"}>SELL</MenuItem>
                  <MenuItem value={"BUY"}>BUY</MenuItem>
                </Select>

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="PriceType"
                  name="priceType"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Quantity"
                  name="quantity"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />  

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="LimitPrice"
                  name="limitPrice"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />  

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Currency"
                  name="currencyId"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />  
{/* 
                <CurrencyDropdown
                  isCrypto = {false}
                  required
                  margin="dense"
                  label="Currency"
                  name="primaryCurrencyId"
                  fullWidth
                  helperText="Please select atleast one"
                  onChange={handleInputChange}
                  value = {values["primaryCurrencyId"]}
                  error={errors["primaryCurrencyId"]}
                /> */}

                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Place Order
                </Button>
              </DialogActions>
                </form>
                </Dialog>
          </div>
          <br></br>
          <hr></hr>
          <div className={styling.contentWrapper}>
            <h3>Your Orders:</h3>
            {orderInfo.data && typeof orderInfo.data !== undefined && orderInfo.data.length!=0 ? (
              <div className={classes.contentWrapper}>
                <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Order Type</b></TableCell>
                      <TableCell align="left"><b>Price Type</b></TableCell>
                      <TableCell align="left"><b>Quantity</b></TableCell>
                      <TableCell align="left"><b>LimitPrice</b></TableCell>
                      <TableCell align="left"><b>Currency</b></TableCell>
                      <TableCell align="left"><b>Status</b></TableCell>
                    </TableRow>
                  </TableHead>
                   <TableBody>
                  {orderInfo.data.map((ordern) => 
                    <TableRow>
                      <TableCell key={ordern.type}>{ordern.type}</TableCell>
                      <TableCell key={ordern.priceType}>{ordern.priceType}</TableCell>
                      <TableCell key={ordern.quantity}>{ordern.quantity}</TableCell>
                      <TableCell key={ordern.limitPrice}>{ordern.limitPrice}</TableCell>
                      <TableCell key={ordern.currencyId}>{ordern.currencyId}</TableCell>
                      <TableCell key={ordern.status}>{ordern.status}</TableCell>
                    </TableRow>
                  )}
                  </TableBody>
                </Table>
                </TableContainer>
                  </div>
                </div>
            ) : (
              <Paper className={classes.paper}>
                <div className={classes.contentWrapper}>
                  <Typography color="textSecondary" align="center">
                    No orders placed yet!!
                  </Typography>
                </div>
              </Paper>
               )}
          </div>
    </div>
      ):(
        <Paper className={classes.paper}>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              Please set up your bank account to place orders
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo,
    error: state.order.error,
    bankInfo : state.bank.bankInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestOrderInfo: () => dispatch(requestOrderInfo()),
    onRequestBankInfo: () => dispatch(requestBankInfo())
  };
};

export default (props) => (
  <ComponentWrapper
    name="Orders"
    helperText="Place your orders."
    Component={connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Content))}
    {...props}
  />
);

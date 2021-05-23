import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "../../../components/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { requestOrderInfo, requestBankInfo } from "../actions.js";
import InputLabel from "@material-ui/core/InputLabel";
import CurrencyDropdown from "../CurrencyDropdown/index";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useForm } from "../../../hooks/useForm";
import EditOrderModal from "./EditOrder";
import CancelOrder from "./CancelOrder";
import Axios from "axios";
import DateFilter from '../DateFilter';
import moment from 'moment';

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
  const {
    classes,
    orderInfo,
    error,
    onRequestOrderInfo,
    onRequestBankInfo,
    bankInfo,
  } = props;

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
      priceType: "MARKET",
      quantity: "",
      type: "SELL",
      limitPrice: 0,
      currencyId: bankInfo?.data?.primaryCurrencyId,
    },
    {
      priceType: true,
      quantity: false,
      type: true,
      limitPrice: true,
      currencyId: true,
    }
  );
  const [open, setOpen] = React.useState(false);
  const [filteredOrders, setFilteredOrders] = React.useState(orderInfo?.data);
  const styling = styles();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filter = ({startDate, endDate}) => {
    let filteredOrder = orderInfo?.data?.filter(item => {
      var startDateObj = new moment(startDate);
      var endDateObj = new moment(endDate);
      var itemDateObj = new moment(item.time.split('T')[0]);
      debugger;
      if((startDateObj > itemDateObj) || (endDateObj < itemDateObj)){
        return false;
      }
      return true;
    })
    setFilteredOrders(filteredOrder);
  }
 
  const onFormSubmit = (event) => {
    formSubmit(event, () => {
      event.preventDefault();
      console.log("form data:", values);
      Axios.put("/order", values).then((response) => {
        if (response.status === 200) {
          setOpen(false);
          setValues({});
          setFieldValid();
          onRequestOrderInfo();
        }
      });
    });
  };

  useEffect(() => {
    onRequestOrderInfo();
    onRequestBankInfo();
  }, []);

  useEffect(() => {
    setFilteredOrders(orderInfo?.data);
  }, [orderInfo]);

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
                onClick={handleClickOpen}
              >
                Place a new order
              </Button>
            </div>
            {open && (
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
                  <DialogTitle id="form-dialog-title">
                    Place your Order
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Place your order to BUY/SELL here.
                    </DialogContentText>

                    <InputLabel id="type">Type</InputLabel>
                    <RadioGroup
                      aria-label="Type"
                      name="type"
                      value={values["type"]}
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel
                        value="SELL"
                        control={<Radio />}
                        label="Sell"
                      />
                      <FormControlLabel
                        value="BUY"
                        control={<Radio />}
                        label="Buy"
                      />
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
                        value="MARKET"
                        control={<Radio />}
                        label="MARKET"
                      />
                      <FormControlLabel
                        value="LIMIT"
                        control={<Radio />}
                        label="LIMIT"
                      />
                    </RadioGroup>

                    <TextField
                      required
                      margin="dense"
                      label="Quantity"
                      name="quantity"
                      fullWidth
                      pattern="^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                      helperText="Please enter a valid quantity"
                      onChange={handleInputChange}
                      value={values["quantity"]}
                      error={errors["quantity"]}
                    />

                    <TextField
                      required
                      margin="dense"
                      label="LimitPrice"
                      name="limitPrice"
                      disabled={values["priceType"] == "MARKET"}
                      fullWidth
                      pattern="^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                      helperText="Please enter a valid limit price"
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
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isFormValid}
                      color="primary"
                    >
                      Place Order
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            )}
          </div>
          <br></br>
          <hr></hr>
          <div className={styling.contentWrapper}>
            <h2>Your Orders</h2>
            <DateFilter filter = {filter}/>
            {orderInfo.data &&
            typeof orderInfo.data !== undefined &&
            orderInfo.data.length != 0 ? (
              <div className={classes.contentWrapper}>
                <div>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>Order Type</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Price Type</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Quantity</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>LimitPrice</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Execution Price</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Service Fee</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Currency</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Status</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Running BTC Balance</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Running Currency Balance</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Edit Order</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Cancel Order</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredOrders?.map((ordern) => (
                          <TableRow key={ordern.id}>
                            <TableCell>{ordern?.type}</TableCell>
                            <TableCell>{ordern?.priceType}</TableCell>
                            <TableCell>{ordern?.quantity}</TableCell>
                            <TableCell>{ordern?.limitPrice}</TableCell>
                            <TableCell>{ordern?.executionPrice}</TableCell>
                            <TableCell>{ordern?.serviceFee}</TableCell>
                            <TableCell>{ordern?.currency?.name}</TableCell>
                            <TableCell>{ordern?.status}</TableCell>
                            <TableCell>
                              {ordern?.runningBitcoinBalance}
                            </TableCell>
                            <TableCell>
                              {ordern?.runningCurrencyBalance}
                            </TableCell>
                            <TableCell>
                              <EditOrderModal order={ordern}></EditOrderModal>
                            </TableCell>
                            <TableCell>
                              <CancelOrder order={ordern}></CancelOrder>
                            </TableCell>
                          </TableRow>
                        ))}
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
      ) : (
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
    bankInfo: state.bank.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestOrderInfo: () => dispatch(requestOrderInfo()),
    onRequestBankInfo: () => dispatch(requestBankInfo()),
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

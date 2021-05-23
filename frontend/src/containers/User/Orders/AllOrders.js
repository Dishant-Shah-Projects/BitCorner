import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { requestBankInfo, requestAllOrderInfo } from "../actions.js";
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

  const styling = styles();
  const [filteredOrders, setFilteredOrders] = React.useState(orderInfo?.data);
  const [totalServiceFee, setTotalServiceFee] = React.useState({});

  const filter = ({startDate, endDate}) => {
    let totalServiceFees = {};
    let filteredOrder = orderInfo?.data?.filter(item => {
      var startDateObj = new moment(startDate);
      var endDateObj = new moment(endDate);
      var itemDateObj = new moment(item.time.split('T')[0]);
      if((startDateObj > itemDateObj) || (endDateObj < itemDateObj)){
        return false;
      }
      if(!totalServiceFees[item?.currency?.name]){
        totalServiceFees[item?.currency?.name] = 0;
      }
      totalServiceFees[item?.currency?.name] += item.serviceFee;
      return true;
    })
    setFilteredOrders(filteredOrder);
    setTotalServiceFee(totalServiceFees);
  }

  useEffect(() => {
    onRequestOrderInfo();
    onRequestBankInfo();
  }, []);

  useEffect(() => {
    setFilteredOrders(orderInfo?.data);
    let sum = {};
    if(orderInfo?.data){
    orderInfo.data.forEach(item => {
      if(!sum[item?.currency?.name]){
        sum[item?.currency?.name] = 0;
      }
      sum[item?.currency?.name] += Number.parseFloat(Number.parseFloat(item.serviceFee).toFixed(7));
    })}
    setTotalServiceFee(sum);
  }, [orderInfo]);

  return (
    <div>
      {bankInfo?.status === 200 ? (
        <div>
          <div className={styling.contentWrapper}>
            <h2>All Orders</h2>
            <DateFilter filter = {filter}/>
            <h3>Total Service Fee for the given time frame</h3>
            {Object.keys(totalServiceFee).map (
              key => {
                return (<div>{key} : {totalServiceFee[key].toFixed(7)}</div>)
              }
            ) 
            }
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
                            <b>Nickname</b>
                          </TableCell>
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredOrders?.map((ordern) => (
                          <TableRow key={ordern.id}>
                            <TableCell>
                              <b>{ordern?.user?.nickName}</b>
                            </TableCell>
                            <TableCell>
                              {ordern?.type}
                            </TableCell>
                            <TableCell>
                              {ordern?.priceType}
                            </TableCell>
                            <TableCell>
                            {(ordern?.quantity > 0 && ordern?.quantity < 1)  ? Number.parseFloat(ordern?.quantity).toFixed(7): ordern?.quantity}
                            </TableCell>
                            <TableCell>
                              {ordern?.limitPrice}
                            </TableCell>
                            <TableCell>
                              {ordern?.executionPrice}
                            </TableCell>
                            <TableCell>
                            {(ordern?.serviceFee > 0 && ordern?.serviceFee < 1)  ? Number.parseFloat(ordern?.serviceFee).toFixed(7): ordern?.serviceFee}
                            </TableCell>
                            <TableCell>
                              {ordern?.currency?.name}
                            </TableCell>
                            <TableCell>
                              {ordern?.status}
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
    orderInfo: state.allOrder.orderInfo,
    error: state.allOrder.error,
    bankInfo: state.bank.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestOrderInfo: () => dispatch(requestAllOrderInfo()),
    onRequestBankInfo: () => dispatch(requestBankInfo()),
  };
};

export default (props) => (
  <ComponentWrapper
    name="All Orders"
    helperText="Place your orders."
    Component={connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Content))}
    {...props}
  />
);

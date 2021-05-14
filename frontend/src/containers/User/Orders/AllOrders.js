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

  useEffect(() => {
    onRequestOrderInfo();
    onRequestBankInfo();
  }, []);
  return (
    <div>
      {bankInfo?.status === 200 ? (
        <div>
          <div className={styling.contentWrapper}>
            <h2>All Orders</h2>
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
                            <b>Currency</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Status</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderInfo.data.map((ordern) => (
                          <TableRow>
                            <TableCell key={ordern?.user?.nickName}>
                              <b>{ordern?.user?.nickName}</b>
                            </TableCell>
                            <TableCell key={ordern?.type}>
                              {ordern?.type}
                            </TableCell>
                            <TableCell key={ordern?.priceType}>
                              {ordern?.priceType}
                            </TableCell>
                            <TableCell key={ordern?.quantity}>
                              {ordern?.quantity}
                            </TableCell>
                            <TableCell key={ordern?.limitPrice}>
                              {ordern?.limitPrice}
                            </TableCell>
                            <TableCell key={ordern?.executionPrice}>
                              {ordern?.executionPrice}
                            </TableCell>
                            {/*TODO : Currency object is not coming from backend*/}
                            <TableCell key={ordern?.currency?.name}>
                              {ordern?.currency?.name}
                            </TableCell>
                            <TableCell key={ordern?.status}>
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

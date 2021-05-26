import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import { connect } from "react-redux";
import { requestUserBalance, requestBankInfo } from "../actions.js";
import BalanceGrid from "./BalanceGrid";

const styles = {
  root: {
    maxWidth: 100,
  },
  media: {
    height: 140,
  },
  table: {
    minWidth: 650,
  },
};

function Content(props) {
  const {
    classes,
    balanceInfo,
    onRequestUserBalance,
    onRequestBankInfo,
    isPending,
    error,
    isLoaded,
    bankInfo,
  } = props;

  useEffect(() => {
    onRequestUserBalance();
    onRequestBankInfo();
  }, []);

  return (
    <div>
      {isLoaded &&
      !isPending &&
      balanceInfo?.data &&
      bankInfo?.status === 200 ? (
        <Paper className={classes.paper}>
          <div className={classes.contentWrapper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Currency</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Balance</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Withdraw/Desposit Amount</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Deposit</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Withdraw</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balanceInfo?.data?.map((balanceInfo) => {
                    return <BalanceGrid balanceInfo={balanceInfo} />;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              Please set up your bank account to view balance information
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    balanceInfo: state?.userBalance?.balanceInfo,
    isPending: state?.userBalance?.isPending,
    error: state?.userBalance?.error,
    isLoaded: state?.userBalance?.isLoaded,
    bankInfo: state?.bank?.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUserBalance: () => dispatch(requestUserBalance()),
    onRequestBankInfo: () => dispatch(requestBankInfo()),
  };
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (props) => (
  <ComponentWrapper
    name="Account Balance"
    helperText="See all the account balance. Withdraw and Deposit amount from your accounts."
    Component={connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Content))}
    {...props}
  />
);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from "react-redux";
import { requestUserBalance } from "../actions.js";
import Axios from "axios";
import BalanceGrid from "./BalanceGrid";

const styles = makeStyles({
  root: {
    maxWidth: 100,
  },
  media: {
    height: 140,
  },
  table: {
    minWidth: 650,
  },
});

function Content(props) {
  const {
    classes,
    balanceInfo,
    onRequestUserBalance,
    isPending,
    error,
    isLoaded,
  } = props;
  const styling = styles();

  useEffect(() => {
    onRequestUserBalance();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={styling.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">Withdraw/Desposit Amount </TableCell>
              <TableCell align="center">Deposit</TableCell>
              <TableCell align="center">Withdraw</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {isLoaded && !isPending && balanceInfo?.data ? (
        <div>
          {balanceInfo.data.map((balanceInfo) => {
            return <BalanceGrid balanceInfo={balanceInfo} />;
          })}
        </div>
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              No Balance Available to Display
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    balanceInfo: state.userBalance.balanceInfo,
    isPending: state.userBalance.isPending,
    error: state.userBalance.error,
    isLoaded: state.userBalance.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUserBalance: () => dispatch(requestUserBalance()),
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

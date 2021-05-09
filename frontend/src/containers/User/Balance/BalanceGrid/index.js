import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import { requestUserBalance } from "../../actions.js";
import { connect } from "react-redux";
import Axios from "axios";

function Grid(props) {
  const { balanceInfo, onRequestUserBalance } = props;
  console.log(balanceInfo);

  let balance = 0;

  const handleDeposit = () => {
    if (balance > 0) {
      Axios.put(
        "balance/" + balanceInfo.currencyId + "/deposit?amount=" + balance
      ).then((response) => {
        if (response.status === 200) {
          console.log("Successfully Deposited Amount");
          onRequestUserBalance();
        } else {
          console.log("Failed");
        }
      });
    }
  };

  const handleWithdraw = () => {
    if (balance > 0) {
        Axios.put(
          "balance/" + balanceInfo.currencyId + "/withdraw?amount=" + balance
        ).then((response) => {
          if (response.status === 200) {
            console.log("Successfully Deposited Amount");
            onRequestUserBalance();
          } else {
            console.log("Failed");
          }
        });
      }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell align="center">{balanceInfo.currency.name}</TableCell>
            <TableCell align="center">{balanceInfo.amount}</TableCell>
            <TableCell align="center">
              <TextField
                autoFocus
                required
                label="Amount to deposit or withdraw"
                name="amount"
                fullWidth
                onInput={(e) => (balance = e.target.value)}
              />
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDeposit}
              >
                Deposit
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleWithdraw}
              >
                Withdraw
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
  const mapDispatchToProps = (dispatch) => {
    return {
      onRequestUserBalance: () => dispatch(requestUserBalance()),
    };
  };

export default connect(null, mapDispatchToProps)(Grid);

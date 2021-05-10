import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TextField from "../../../../components/TextField";
import { requestUserBalance } from "../../actions.js";
import { connect } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import Axios from "axios";

function Grid(props) {
  const { balanceInfo, onRequestUserBalance } = props;

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
  } = useForm({ amount: 0 }, { amount: false });


  const handleDeposit = (event) => {
    formSubmit(event, () => {
      Axios.put(
        "balance/" + balanceInfo.currencyId + "/deposit?amount=" + values.amount
      ).then((response) => {
        if (response.status === 200) {
          console.log("Successfully Deposited Amount");
          onRequestUserBalance();
        }
      });
    });
  };

  const handleWithdraw = (event) => {
    formSubmit(event, () => {
      Axios.put(
        "balance/" + balanceInfo.currencyId + "/withdraw?amount=" + values.amount
      ).then((response) => {
        if (response.status === 200) {
          console.log("Successfully Deposited Amount");
          onRequestUserBalance();
        }
      });
    });
  };


  return (
    <TableContainer component={Paper}>
      <form noValidate>
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
                  pattern="^[+]?([.]\d+|\d+([.]\d\d?)?)$"
                  helperText="Please enter a valid amount greater than 0"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                  value={values["amount"]}
                  error={errors["amount"]}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleDeposit}
                  disabled={!isFormValid}
                >
                  Deposit
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleWithdraw}
                  disabled={!isFormValid}
                >
                  Withdraw
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUserBalance: () => dispatch(requestUserBalance()),
  };
};

export default connect(null, mapDispatchToProps)(Grid);

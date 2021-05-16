import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TextField from "../../../../components/TextField";
import { requestOnUpdate } from "../../actions.js";
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
    saveData(event, "deposit");
  };

  const handleWithdraw = (event) => {
    saveData(event, "withdraw");
  };

  const saveData = (event, url) => {
    formSubmit(event, () => {
      Axios.put(
        "balance/" +
          balanceInfo.currencyId +
          "/" +
          url +
          "?amount=" +
          values.amount
      ).then((response) => {
        if (response.status === 200) {
          onRequestUserBalance();
          setValues({ ...values, amount: 0 });
        }
      });
    });
  };
  return (
    <TableRow>
      <TableCell align="center">{balanceInfo.currency.name}</TableCell>
      <TableCell align="center">{balanceInfo.amount}</TableCell>
      <TableCell align="center">
        <TextField
          autoFocus
          required
          label="Amount to deposit or withdraw"
          name="amount"
          pattern="^(\d{1,9}|\d{0,5}\.\d{1,9})$"
          helperText="Please enter a valid amount"
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
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUserBalance: () => dispatch(requestOnUpdate()),
  };
};

export default connect(null, mapDispatchToProps)(Grid);

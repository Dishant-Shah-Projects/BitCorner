import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { requestBillPayInfo } from "../action";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RejectBill from './RejectBill';
import PayBillModal from './PayBill'
// Generate Order Data
function createData(id, userName, description, amount, paymentMethod,date, status) {
  return { id, userName, description, amount, paymentMethod, date,status };
}

let rows = [
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
function BilltoPay(props) {
  const classes = useStyles();
  const {  bills, onrequestBillPayInfo} = props;
  rows=[]
  bills.bills.map((bill)=>rows.push(createData(bill, bill.fromUser.userName, bill.description, bill.amount, bill.targetCurrency.name, bill.dueDate,bill.status)))
  useEffect(() => {
    
    onrequestBillPayInfo();

    

  }, []);
  return (
    <React.Fragment>
          <br></br>
          <br></br>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
    Bills to Pay
      
    </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Pay</TableCell>
            <TableCell align="right">Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right"><PayBillModal bill = {row.id}/></TableCell>
              <TableCell align="right"><RejectBill bill = {row.id}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    bills: state.billPay,
    currency :state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestBillPayInfo: () => dispatch(requestBillPayInfo())
  };
};



BilltoPay.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BilltoPay);
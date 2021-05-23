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
import PayBillModal from './PayBill';
import DateFilter from '../../DateFilter';
import moment from 'moment';
// Generate Order Data
function createData(id, userName,time, description, amount, paymentMethod,date, status) {
  return { id, userName,time, description, amount, paymentMethod, date,status };
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
  const [filteredOrders, setFilteredOrders] = React.useState(bills.bills);
  rows=[]
  filteredOrders.map((bill)=>rows.push(createData(bill, bill.fromUser.userName,bill.time, bill.description, bill.amount, bill.targetCurrency.name, bill.dueDate,bill.status)))
  const filter = ({startDate, endDate}) => {
    let filteredOrder = bills?.bills?.filter(item => {
      console.log("ITEMS");
      console.log(item);
      var startDateObj = new moment(startDate);
      var endDateObj = new moment(endDate);
      var itemDateObj = new moment(item.time.split('T')[0]);
      
      if((startDateObj > itemDateObj) || (endDateObj < itemDateObj)){
        return false;
      }
      return true;
    })
    setFilteredOrders(filteredOrder);
  }
  useEffect(() => {
    
    onrequestBillPayInfo();

    

  }, []);
  useEffect(() => {
    setFilteredOrders(bills.bills);
  }, [bills]);
  return (
    <React.Fragment>
          <br></br>
          <br></br>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
    Bills to Pay
      
    </Typography>
    <DateFilter filter = {filter}/>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>Date Posted</TableCell>
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
              <TableCell>{row.time.split('T')[0]}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{(row.amount > 0 && row.amount < 1)  ? Number.parseFloat(row.amount).toFixed(7): row.amount}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.date.split('T')[0]}</TableCell>
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
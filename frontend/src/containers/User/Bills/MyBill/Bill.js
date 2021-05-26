import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { requestBillInfo } from "../action";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditBillModal from "./EditBill";
import DateFilter from "../../DateFilter";
import moment from "moment";
import CancelBill from "./CancelBill";
// Generate Order Data
function createData(
  id,
  userName,
  time,
  description,
  amount,
  paymentMethod,
  date,
  status
) {
  return {
    id,
    userName,
    time,
    description,
    amount,
    paymentMethod,
    date,
    status,
  };
}

let rows = [];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
function Bill(props) {
  const classes = useStyles();
  const { bills, onrequestBillInfo } = props;
  const [filteredOrders, setFilteredOrders] = React.useState(bills.bills);

  rows = [];
  filteredOrders.map((bill) =>
    rows.push(
      createData(
        bill,
        bill.toUser.userName,
        bill.time,
        bill.description,
        bill.amount,
        bill.targetCurrency.name,
        bill.dueDate,
        bill.status
      )
    )
  );
  const filter = ({ startDate, endDate }) => {
    let filteredOrder = bills?.bills?.filter((item) => {
      var startDateObj = new moment(startDate);
      var endDateObj = new moment(endDate);
      var itemDateObj = new moment(item.time.split("T")[0]);

      if (startDateObj > itemDateObj || endDateObj < itemDateObj) {
        return false;
      }
      return true;
    });
    setFilteredOrders(filteredOrder);
  };
  useEffect(() => {
    onrequestBillInfo();
  }, []);
  useEffect(() => {
    setFilteredOrders(bills.bills);
  }, [bills]);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Your Bills
      </Typography>
      <DateFilter filter={filter} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>To</b>
            </TableCell>
            <TableCell>
              <b>Date Posted</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>Amount</b>
            </TableCell>
            <TableCell>
              <b>Currency</b>
            </TableCell>
            <TableCell align="right">
              <b>Due Date</b>
            </TableCell>
            <TableCell align="right">
              <b>Status</b>
            </TableCell>
            <TableCell align="right">
              <b>Edit</b>
            </TableCell>
            <TableCell align="right">
              <b>Cancel</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.time.split("T")[0]}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                {row.amount > 0 && row.amount < 1
                  ? Number.parseFloat(row.amount).toFixed(7)
                  : row.amount}
              </TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.date.split("T")[0]}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <EditBillModal bill={row.id}></EditBillModal>
              </TableCell>
              <TableCell align="right">
                <CancelBill bill={row.id}></CancelBill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    bills: state.bill,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestBillInfo: () => dispatch(requestBillInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bill);

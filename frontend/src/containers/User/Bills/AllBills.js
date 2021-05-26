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
import { requestAllBills } from "./action.js";
import { requestBankInfo } from "../actions.js";
import DateFilter from "../DateFilter";
import moment from "moment";

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
    error,
    onRequestAllBills,
    allBills,
    onRequestBankInfo,
    bankInfo,
  } = props;

  const [filteredBills, setFilteredBills] = React.useState(allBills);
  const [totalServiceFee, setTotalServiceFee] = React.useState({});

  const filter = ({ startDate, endDate }) => {
    let totalServiceFees = {};
    let filteredOrder = allBills?.filter((item) => {
      var startDateObj = new moment(startDate);
      var endDateObj = new moment(endDate);
      var itemDateObj = new moment(item.time.split("T")[0]);
      if (startDateObj > itemDateObj || endDateObj < itemDateObj) {
        return false;
      }
      if (item?.paidCurrency) {
        if (!totalServiceFees[item?.paidCurrency?.name]) {
          totalServiceFees[item?.paidCurrency?.name] = 0;
        }
        totalServiceFees[item?.paidCurrency?.name] += item.serviceFee;
      }
      return true;
    });
    setFilteredBills(filteredOrder);
    setTotalServiceFee(totalServiceFees);
  };

  useEffect(() => {
    onRequestAllBills();
    onRequestBankInfo();
  }, []);

  useEffect(() => {
    setFilteredBills(allBills);
    let sum = {};
    if (allBills) {
      allBills.forEach((item) => {
        if (item?.paidCurrency) {
          if (!sum[item?.paidCurrency?.name]) {
            sum[item?.paidCurrency?.name] = 0;
          }
          sum[item?.paidCurrency?.name] += Number.parseFloat(
            Number.parseFloat(item.serviceFee).toFixed(8)
          );
        }
      });
    }
    setTotalServiceFee(sum);
  }, [allBills]);

  return (
    <div>
      {bankInfo?.status === 200 ? (
        <div>
          <div className={classes.contentWrapper}>
            <DateFilter filter={filter} />
            <h3>Total Service Fee for the given time frame</h3>
            {Object.keys(totalServiceFee).map((key) => {
              return (
                <div>
                  {key} : {totalServiceFee[key].toFixed(8)}
                </div>
              );
            })}
            {allBills && allBills?.length != 0 ? (
              <div className={classes.contentWrapper}>
                <div>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>From</b>
                          </TableCell>
                          <TableCell>
                            <b>To</b>
                          </TableCell>
                          <TableCell>
                            <b>Date Posted</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Description</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Amount</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Target Currency</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Bill Pay Currency</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Service Fee +<br/>Margin<br/>(Where Applicable)</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Exchange Rate</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Due Date</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Status</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBills?.map((bill) => (
                          <TableRow key={bill.id}>
                            <TableCell>{bill?.fromUser?.userName}</TableCell>
                            <TableCell>{bill?.toUser?.userName}</TableCell>
                            <TableCell>{bill?.time.split("T")[0]}</TableCell>
                            <TableCell>{bill?.description}</TableCell>
                            <TableCell>{bill?.amount}</TableCell>
                            <TableCell>{bill?.targetCurrency?.name}</TableCell>
                            <TableCell>{bill?.paidCurrency?.name}</TableCell>
                            <TableCell>
                              {bill?.serviceFee > 0 && bill?.serviceFee < 1
                                ? Number.parseFloat(bill?.serviceFee).toFixed(8)
                                : bill?.serviceFee}
                            </TableCell>
                            <TableCell>
                              {bill?.paidCurrency
                                ? bill?.paidCurrency?.id !=
                                    bill?.targetCurrency?.id &&
                                  (bill?.paidCurrency?.id === 6 ||
                                    bill?.targetCurrency?.id === 6)
                                  ? "-"
                                  : bill?.paidCurrency?.conversionRate /
                                    bill?.targetCurrency?.conversionRate
                                : "-"}
                            </TableCell>
                            <TableCell>{bill?.dueDate.split("T")[0]}</TableCell>
                            <TableCell>{bill?.status}</TableCell>
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
                    No Bills created yet!!
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
              Please set up your bank account to view all bills
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
    allBills: state.allBills.allBills,
    error: state.allBills.error,
    bankInfo: state.bank.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestAllBills: () => dispatch(requestAllBills()),
    onRequestBankInfo: () => dispatch(requestBankInfo()),
  };
};

export default (props) => (
  <ComponentWrapper
    name="All Bills"
    helperText="All system bills"
    Component={connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Content))}
    {...props}
  />
);

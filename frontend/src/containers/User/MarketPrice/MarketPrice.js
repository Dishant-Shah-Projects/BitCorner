import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";
import CurrencyDropdown from "../CurrencyDropdown/index";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Axios from "axios";

import { requestBankInfo, requestMarketPrice } from "../actions.js";
function MarketPrice(props) {
  const {
    classes,
    onRequestMarketPrice,
    onRequestBankInfo,
    marketPriceInfo,
    bankInfo,
  } = props;

  const id = 1;
  const [option, setOption] = React.useState(id);
  const onChange = (e) => {
    setOption(e.target.value);
  };
  const [interval, setinterval] = React.useState(null);
  useEffect(() => {
    onRequestMarketPrice();
    onRequestBankInfo();
    setinterval((previnterval) => {
      if (previnterval) {
        clearInterval(previnterval);
      }
      return setInterval(onRequestMarketPrice, 30000);
    });
    return () => {
      setinterval((previnterval) => {
        if (previnterval) {
          clearInterval(previnterval);
        }
        return null;
      });
    };
  }, []);

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
          <TableCell style = {{borderBottom:"None"}}>
              <CurrencyDropdown
                isCrypto={false}
                required
                margin="dense"
                name="currencyId"
                fullWidth
                helperText="Please select atleast one"
                onChange={onChange}
                value={option}
              />
            </TableCell>
            <TableCell style = {{borderBottom:"None"}}>
              Ask Price
              <br />
              <b>{marketPriceInfo[option]?.askPrice}</b>{" "}
            </TableCell>
            <TableCell style = {{borderBottom:"None"}}>
              Bid Price
              <br />
              <b>{marketPriceInfo[option]?.bidPrice}</b>{" "}
            </TableCell>
            <TableCell style = {{borderBottom:"None"}}>
              Transaction Price
              <br />
              <b>{marketPriceInfo[option]?.transactionPrice}</b>{" "}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MarketPrice.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    marketPriceInfo: state.marketPrice.marketPriceInfo,
    bankInfo: state.bank.bankInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestMarketPrice: () => dispatch(requestMarketPrice()),
    onRequestBankInfo: () => dispatch(requestBankInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPrice);

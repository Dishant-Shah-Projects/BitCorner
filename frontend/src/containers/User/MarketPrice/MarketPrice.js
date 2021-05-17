import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";
import CurrencyDropdown from "../CurrencyDropdown/index"
import Select from "../../../components/Select";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "../../../components/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import { requestBankInfo, requestMarketPrice } from "../actions.js";
//import { TextField } from "@material-ui/core";
import { requestCurrencyInfo } from "../Bills/action";


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

const id = 1;
function MarketPrice(props) {
        const {
          classes,
          onRequestMarketPrice,
          onRequestBankInfo,
          marketPriceInfo,
          currency,
          bankInfo
        } = props;
        
        const styling = styles();
        const id = bankInfo?.data?.primaryCurrencyId;
        const [option,setOption] = React.useState(1);
        const onChange = (e) => {setOption(e.target.value); console.log("option value",option);}
        
        useEffect(() => {
          onRequestMarketPrice(option);
          onRequestBankInfo();
        }, [option]);
        return(
            <>
               {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                onChange={onChange}
                options= {currency}>

                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>  */}
              
              <Table >
                <TableRow>
              <TableCell style = {{backgroundColor: 'teal'}}><b>Ask Price: {marketPriceInfo?.data?.askPrice}</b> </TableCell>
              <TableCell style = {{backgroundColor: 'teal'}}><b>Bid Price: {marketPriceInfo?.data?.bidPrice}</b> </TableCell>
              <TableCell style = {{backgroundColor: 'teal'}}><b>Transaction Price: {marketPriceInfo?.data?.transactionPrice}</b> </TableCell>
              <TableCell style = {{backgroundColor: 'white',width: 50}}><TextField style = {{width: 50}} onInput={onChange} name="cid" ></TextField></TableCell>
              </TableRow>
              </Table> 
          </>
        );
    }

    MarketPrice.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      const mapStateToProps = (state) => {
        return {
          marketPriceInfo: state.marketPrice.marketPriceInfo,
          bankInfo: state.bank.bankInfo,
          currency: state.currency.currencies
        };
      };
      
      const mapDispatchToProps = (dispatch) => {
        return {
          onRequestMarketPrice: (option) => dispatch(requestMarketPrice(option)),
          onRequestBankInfo: () => dispatch(requestBankInfo()),
          onRequestCurrencyInfo: () => dispatch(requestCurrencyInfo())
        };
      };
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(MarketPrice));
      

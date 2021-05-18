import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ComponentWrapper from "../ComponentWrapper";
import CurrencyDropdown from "../CurrencyDropdown/index"
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Axios from "axios";

import { requestBankInfo, requestMarketPrice } from "../actions.js";

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
  table: {
    minWidth: 500,
  },
  tableRow: {
    height: 30,
  },
  
});

function MarketPrice(props) {
        const {
          classes,
          onRequestMarketPrice,
          onRequestBankInfo,
          marketPriceInfo,
          bankInfo
        } = props;
    
        const styling = styles();
        // const id = bankInfo?.data?.primaryCurrencyId;
        const id=1;
        const [option,setOption] = React.useState(id);
        const onChange = (e) => {setOption(e.target.value);}
        const mp = marketPriceInfo?.data;

        useEffect(() => {
          onRequestMarketPrice(option);
          onRequestBankInfo();
        }, [option]);

        // const api = () => {Axios.get(`/marketprice/cid?&currencyId=${option}`)
        // .then(res => this.setState({ marketPriceInfo: res.data }))
        // .catch(error => console.log(error));}

        return(
            <>
             <TableContainer>
               <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                  <TableCell><b>Ask Price</b> </TableCell>
                  <TableCell><b>Bid Price</b></TableCell>
                  <TableCell><b>Transaction Price</b></TableCell>
                  <TableCell><b>Currency</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                <TableRow className={classes.tableRow} >
                  <TableCell><b>{marketPriceInfo?.data?.askPrice}</b> </TableCell>
                  <TableCell><b>{marketPriceInfo?.data?.bidPrice}</b> </TableCell>
                  <TableCell><b>{marketPriceInfo?.data?.transactionPrice}</b> </TableCell>
                  <TableCell>
                    <CurrencyDropdown
                        isCrypto={false}
                        required
                        margin="dense"
                        //label="Currency"
                        name="currencyId"
                        fullWidth
                        helperText="Please select atleast one"
                        onChange={onChange}
                        value={option}
                      />
                  </TableCell>
               </TableRow>
               </TableBody>
              </Table> 
              </TableContainer>
          </>
        );
    }

    MarketPrice.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      const mapStateToProps = (state) => {
        return {
          marketPriceInfo: state.marketPrice.marketPriceInfo,
          bankInfo: state.bank.bankInfo
        };
      };
      
      const mapDispatchToProps = (dispatch) => {
        return {
          onRequestMarketPrice: (option) => dispatch(requestMarketPrice(option)),
          onRequestBankInfo: () => dispatch(requestBankInfo())
        };
      };
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(MarketPrice));
      

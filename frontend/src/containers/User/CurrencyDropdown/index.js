import React, { useEffect } from "react";
import Select from "../../../components/Select";
import { connect } from "react-redux";
import { requestCurrencyInfo } from "../Bills/action";
export const CurrencyDropdown = (props) => {
  const { onrequestCurrencyInfo, currencies } = props;



  useEffect(() => {
    onrequestCurrencyInfo();
  }, []);

  return (
    <Select
      options={currencies}
      valueKey="id"
      displayKey="name"
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
    currencies :state.currency.currencies,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestCurrencyInfo: ()  => dispatch(requestCurrencyInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);
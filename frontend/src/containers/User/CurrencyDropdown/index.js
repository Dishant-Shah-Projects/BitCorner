import React, { useEffect } from "react";
import Select from "../../../components/Select";
import { connect } from "react-redux";
import { requestCurrencyInfo } from "../Bills/action";
export const CurrencyDropdown = (props) => {
  const { onrequestCurrencyInfo, currencies, isCrypto } = props;

  useEffect(() => {
    if (currencies?.length === 0) onrequestCurrencyInfo();
  }, [currencies]);

  if (!isCrypto) {
    delete currencies[5];
  }

  return (
    <Select options={currencies} valueKey="id" displayKey="name" {...props} />
  );
};

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestCurrencyInfo: () => dispatch(requestCurrencyInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);

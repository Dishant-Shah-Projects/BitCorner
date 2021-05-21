import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import ComponentWrapper from "../ComponentWrapper";
import { requestBillInfo, requestCurrencyInfo } from "../Bills/action";
import { requestOrderInfo, requestBankInfo } from "../actions.js";
import Axios from "axios";
import { useForm } from "../../../hooks/useForm";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

const styles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  center: {
    justifyContent: "center",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  table: {
    minWidth: 600,
  },
}));

function CancelOrder(props) {
  const { classes, order, onrequestOrderInfo } = props;
  const styling = styles();

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
  } = useForm(
    {
      type: order.type,
      priceType: order.priceType,
      quantity: order.quantity,
      limitPrice: order.limitPrice,
      currencyId: order.currencyId,
    },
    {}
  );

  const FormSubmit = (event) => {
    Axios.put(`/order/cancel?&orderId=${order.id}`, values).then((response) => {
      if (response.status === 200) {
        onrequestOrderInfo();
      } else {
      }
    });
  };

  let disabled = false;
  if (order.status == "Fulfilled" || order.status == "Cancelled") {
    disabled = true;
  }
  return (
    <Button
      style={{ margin: "0 auto", display: "flex" }}
      variant="outlined"
      color="primary"
      onClick={FormSubmit}
      disabled={disabled}
    >
      <CancelPresentationIcon />
    </Button>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestOrderInfo: () => dispatch(requestOrderInfo()),
  };
};

CancelOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CancelOrder));

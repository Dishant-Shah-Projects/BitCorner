import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import ComponentWrapper from "../ComponentWrapper";
import { requestBillPayInfo } from "../action";

import Axios from "axios";

import { useForm } from "../../../../hooks/useForm";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

const styles = (theme) => ({
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
});

function RejectBill(props) {
  const { classes, bill, onrequestBillInfo } = props;
  

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
      id: bill.id,
    },
    {}
  );

  const FormSubmit = (event) => {
    Axios.put(`/bill/reject?&ID=${bill.id}`, null).then((response) => {
      if (response.status === 200) {
        onrequestBillInfo();
      } else {
      }
    });
  };

  let disabled = false;
  if (
    bill.status === "Paid" ||
    bill.status === "Cancelled" ||
    bill.status === "Rejected"
  ) {
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

const mapDispatchToProps = (dispatch) => {
  return {
    onrequestBillInfo: () => dispatch(requestBillPayInfo()),
  };
};

RejectBill.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(RejectBill));

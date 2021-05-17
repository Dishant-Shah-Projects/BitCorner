import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import ComponentWrapper from "../ComponentWrapper";
import { requestBillInfo  } from "../action";

import Axios from "axios";

import { useForm } from "../../../../hooks/useForm";
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

function CancelBill(props) {
  const { classes, bill , onrequestBillInfo } = props;
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
        id:bill.id
    },
    {}
  );

  const FormSubmit = (event) => {
    Axios.put(`/bill/cancel?&ID=${bill.id}`,null).then((response) => {
      if (response.status === 200) {
        
        onrequestBillInfo();
      } else {
      }
    });
  };


  let disabled = false
  if(bill.status==="Paid" || bill.status==="Cancelled"||bill.status==="Rejected"){
    disabled = true
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
    onrequestBillInfo: () => dispatch(requestBillInfo())
  };
};

CancelBill.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null,
  mapDispatchToProps
)(withStyles(styles)(CancelBill));
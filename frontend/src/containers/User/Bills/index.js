import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ComponentWrapper from "../ComponentWrapper";
import { requestCurrencyInfo} from "./action";
import BillModal from './BillModal/index'
import Bill from './MyBill/Bill';
import BilltoPay from'./BillPay/BilllTable';
import { BASE_URL } from "../../constants";
import Axios from "axios";

const styles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  contentWrapper: {
    margin: "40px 16px",
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

function Content(props) {
  const { classes, onRequestBankInfo, isPending, bankInfo, error } = props;
  const [open, setOpen] = React.useState(false);
  const styling = styles();
  const formData = {
    primaryCurrency: {
      id: 1,
      name: "testium",
      conversionRate: 5.0,
      initialValue: 10.0,
      crypto: false,
      base: false,
    },
  };



  const handleInput = (event) => {
    event.preventDefault();
    console.log("FormData", formData);
    console.log(BASE_URL);
    Axios.put(BASE_URL + "/bank", formData).then((response) => {
      if (response.status === 200) {
        console.log("Successfully Added Bank Account");
        setOpen(false);
      } else {
        console.log("Failed");
      }
    });
  };

  useEffect(() => {
    
    
  }, []);

  return (
    <div>
      <BillModal/>
      <Bill/>
      <BilltoPay/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currencies :state.currencies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (props) => (
  <ComponentWrapper
    name="Bank Account Details"
    helperText="View and update your bank account information"
    Component={connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Content))}
    {...props}
  />
);

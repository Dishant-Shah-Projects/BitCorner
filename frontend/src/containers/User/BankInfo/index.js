import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ComponentWrapper from "../ComponentWrapper";
import { requestBankInfo } from "../actions.js";
import { useForm } from "../../../hooks/useForm";
import TextField from "../../../components/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import CurrencyDropdown from "../CurrencyDropdown/index";
import Axios from "axios";

const styles = (theme) => ({
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
  dialogCenter: {
    textAlign: "center",
  },
});

function Content(props) {
  const { classes, onRequestBankInfo, isPending, bankInfo, error, isLoaded } =
    props;

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
      bankName: "",
      initialBalance: 0,
      country: "",
      ownerName: "",
      city: "",
      state: "",
      primaryCurrencyId: 1,
    },
    {
      bankName: false,
      initialBalance: false,
      country: false,
      ownerName: false,
      city: false,
      state: false,
      primaryCurrencyId: true,
    }
  );

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onFormSubmit = (event) => {
    formSubmit(event, () => {
      Axios.put("/bank", values).then((response) => {
        if (response.status === 200) {
          setOpen(false);
          onRequestBankInfo();
        }
      });
    });
  };

  useEffect(() => {
    onRequestBankInfo();
  }, []);

  return (
    <div>
      {isPending && isLoaded && error?.response?.status === 404 ? (
        <div className={classes.contentWrapper}>
          <div>
            <Button
              style={{ margin: "0 auto", display: "flex" }}
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Account
            </Button>
          </div>
          {open && (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <form
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <DialogTitle id="form-dialog-title">
                  Set up Bank Account
                </DialogTitle>
                <DialogContent style={{ textAlign: "center" }}>
                  <DialogContentText>
                    To start trading Bitcoins or to start paying bills please
                    set up a bank account
                  </DialogContentText>

                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Bank Name"
                    name="bankName"
                    pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                    helperText="Please enter a valid bank name"
                    onChange={handleInputChange}
                    value={values["bankName"]}
                    error={errors["bankName"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    id="country"
                    label="Country"
                    name="country"
                    fullWidth
                    pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                    helperText="Please enter a valid Country"
                    onChange={handleInputChange}
                    value={values["country"]}
                    error={errors["country"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="accountNumber"
                    label="Account Number"
                    fullWidth
                    pattern="^[0-9]{1,20}$"
                    helperText="Please enter a valid account number"
                    onChange={handleInputChange}
                    value={values["accountNumber"]}
                    error={errors["accountNumber"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="ownerName"
                    label="Account Holder Name"
                    fullWidth
                    pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                    helperText="Please enter a valid account holder name"
                    onChange={handleInputChange}
                    value={values["ownerName"]}
                    error={errors["ownerName"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="street"
                    label="Street"
                    fullWidth
                    pattern="^[a-zA-Z0-9,.]+(?:[\s-][a-zA-Z0-9,.]+)*$"
                    helperText="Please enter a valid Street name"
                    onChange={handleInputChange}
                    value={values["street"]}
                    error={errors["street"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="city"
                    label="City"
                    fullWidth
                    pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                    helperText="Please enter a valid City"
                    onChange={handleInputChange}
                    value={values["city"]}
                    error={errors["city"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="state"
                    label="State"
                    fullWidth
                    pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                    helperText="Please enter a valid state"
                    onChange={handleInputChange}
                    value={values["state"]}
                    error={errors["state"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="zip"
                    label="Zip Code"
                    fullWidth
                    pattern="^[0-9]{5}(?:-[0-9]{4})?$"
                    helperText="Please enter a valid zip code"
                    onChange={handleInputChange}
                    value={values["zip"]}
                    error={errors["zip"]}
                  />
                  <CurrencyDropdown
                    isCrypto={false}
                    required
                    margin="dense"
                    label="Currency"
                    name="primaryCurrencyId"
                    fullWidth
                    helperText="Please select atleast one"
                    onChange={handleInputChange}
                    value={values["primaryCurrencyId"]}
                    error={errors["primaryCurrencyId"]}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="initialBalance"
                    label="Initial Bank Balance"
                    fullWidth
                    pattern="^(\d{1,9}|\d{0,9}\.\d{1,9})$"
                    helperText="Please enter a valid intital balance"
                    onChange={handleInputChange}
                    value={values["initialBalance"]}
                    error={errors["initialBalance"]}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!isFormValid} color="primary">
                    Add Account
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          )}
        </div>
      ) : bankInfo?.data ? (
        <Paper className={classes.paper}>
          <div className={classes.contentWrapper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Bank Name
                    </TableCell>
                    <TableCell>{bankInfo?.data["bankName"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Account Number
                    </TableCell>
                    <TableCell>{bankInfo?.data["accountNumber"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Owner Name
                    </TableCell>
                    <TableCell>{bankInfo?.data["ownerName"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Street</TableCell>
                    <TableCell>{bankInfo?.data["street"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>City</TableCell>
                    <TableCell>{bankInfo?.data["city"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>State</TableCell>
                    <TableCell>{bankInfo?.data["state"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Zip</TableCell>
                    <TableCell>{bankInfo?.data["zip"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Country
                    </TableCell>
                    <TableCell>{bankInfo?.data["country"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Primary Currency
                    </TableCell>
                    <TableCell>
                      {bankInfo?.data["primaryCurrency"]["name"]}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      ) : (
        <div>
          <Typography>Nothing to show!!</Typography>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bankInfo: state?.bank?.bankInfo,
    isPending: state?.bank?.isPending,
    error: state?.bank?.error,
    isLoaded: state?.bank?.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestBankInfo: () => dispatch(requestBankInfo()),
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

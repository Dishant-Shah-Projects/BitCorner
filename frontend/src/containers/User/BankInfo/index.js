import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ComponentWrapper from "../ComponentWrapper";
import { requestBankInfo } from "../actions.js";
import TextField from "@material-ui/core/TextField";
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
  const {
    classes,
    onRequestBankInfo,
    isPending,
    bankInfo,
    error,
    isLoaded,
  } = props;
  const [open, setOpen] = React.useState(false);
  const styling = styles();
  const formData = {};

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleInput = (event) => {
    event.preventDefault();
    console.log("FormData", formData);

    Axios.put("/bank", formData).then((response) => {
      if (response.status === 200) {
        console.log("Successfully Added Bank Account");
        setOpen(false);
        onRequestBankInfo();
      } else {
        console.log("Failed");
      }
    });
  };

  useEffect(() => {
    onRequestBankInfo();
  }, []);

  return (
    <div>
      {isPending && isLoaded && error.response.status === 404 ? (
        <div className={styling.contentWrapper}>
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form
              className={styling.root}
              noValidate
              autoComplete="off"
              onSubmit={handleInput}
            >
              <DialogTitle id="form-dialog-title">
                Set up Bank Account
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To start trading Bitcoins or to start paying bills please set
                  up a bank account
                </DialogContentText>

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Bank Name"
                  name="bankName"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="country"
                  label="Country"
                  name="country"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="accountNumber"
                  label="Account Number"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="ownerName"
                  label="Account Holder Name"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="street"
                  label="Street"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="city"
                  label="City"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="state"
                  label="State"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="zip"
                  label="Zip Code"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="primaryCurrencyId"
                  label="Currency"
                  fullWidth
                  onInput={(e) => (formData[e.target.name] = e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="initialBalance"
                  label="Initial Bank Balance"
                  fullWidth
                  onInput={(e) =>
                    (formData[e.target.name] = e.target.value)
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Account
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      ) : bankInfo.data && typeof bankInfo.data !== undefined ? (
        <div className={classes.contentWrapper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>{bankInfo.data["bankName"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account Number</TableCell>
                  <TableCell>{bankInfo.data["accountNumber"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Owner Name</TableCell>
                  <TableCell>{bankInfo.data["ownerName"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Street</TableCell>
                  <TableCell>{bankInfo.data["street"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell>{bankInfo.data["city"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell>{bankInfo.data["state"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Zip</TableCell>
                  <TableCell>{bankInfo.data["zip"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>{bankInfo.data["country"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Primary Currency</TableCell>
                  <TableCell>
                    {bankInfo.data["primaryCurrency"]["name"]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
    bankInfo: state.bank.bankInfo,
    isPending: state.bank.isPending,
    error: state.bank.error,
    isLoaded: state.bank.isLoaded,
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

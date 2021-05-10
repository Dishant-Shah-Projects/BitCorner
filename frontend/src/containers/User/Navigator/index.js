import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import firebase from "../../Firebase";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PersonIcon from "@material-ui/icons/Person";

const rootPrefix = ``;

const categories = [
  {
    id: "Bank Info",
    icon: <AccountBalanceIcon />,
    expandable: false,
    to: "/bank",
  },
  {
    id: "Balance",
    icon: <AccountBalanceWalletIcon />,
    expandable: false,
    to: "/balance",
  },
  {
    id: "Orders",
    icon: <MonetizationOnIcon />,
    expandable: false,
    to: "/orders",
  },
  {
    id: "Bills",
    icon: <ReceiptIcon />,
    expandable: false,
    to: "/bills",
  },
  {
    id: "Profile",
    icon: <PersonIcon />,
    expandable: false,
    to: "/profile",
  },
];
const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function ListItemLink(props) {
  const {
    id,
    to,
    classes,
    icon,
    expandable,
    subCategories,
    prefix,
    ...other
  } = props;
  const [open, setOpen] = useState(false);
  // const primary = breadcrumbNameMap[to];
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <React.Fragment>
      <li>
        {expandable ? (
          <ListItem
            button
            onClick={toggleOpen}
            className={clsx(classes.item)}
            {...other}
          >
            <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
            <ListItemText
              primary={id}
              classes={{
                primary: classes.itemPrimary,
              }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        ) : (
          <ListItem
            button
            component={RouterLink}
            to={prefix + to}
            className={clsx(classes.item)}
            {...other}
          >
            <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
            <ListItemText
              primary={id}
              classes={{
                primary: classes.itemPrimary,
              }}
            />
          </ListItem>
        )}
      </li>
      {expandable && (
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <List disablePadding style={{ marginLeft: "10px" }}>
            {subCategories &&
              subCategories.map((item, index) => (
                <ListItemLink
                  classes={classes}
                  prefix={prefix + to}
                  {...item}
                />
              ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
}

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          Bit Corner
        </ListItem>
        {categories.map((item) => (
          <ListItemLink {...item} classes={classes} prefix={rootPrefix} />
        ))}

        <Divider />

        <ListItem
          button
          className={clsx(classes.item)}
          onClick={() => {
            window.location = "/";
            firebase.auth().signOut();
          }}
          {...other}
        >
          <ListItemIcon className={classes.itemIcon}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary={"Logout"}
            classes={{
              primary: classes.itemPrimary,
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);

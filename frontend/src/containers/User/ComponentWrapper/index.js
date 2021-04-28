import React from "react";
import SecondHeader from "./SecondHeader";

export default function ComponentWrapper(props) {
  const { name, helperText, Component, classes } = props;
  return (
    <React.Fragment>
      <SecondHeader classes={classes} name={name} helperText={helperText} />
      <main className={classes.main}>
        <Component classes={classes} {...props} />
      </main>
    </React.Fragment>
  );
}

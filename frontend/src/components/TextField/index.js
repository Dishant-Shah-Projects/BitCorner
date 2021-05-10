import React from "react";
import TextField from "@material-ui/core/TextField";

export default function index(props) {
  const { onChange, pattern, helperText, error, name } = props;
  return (
    <TextField
      variant="outlined"
      fullWidth
      type="text"
      onBlur={onChange}
      inputProps={{ pattern: pattern }}
      {...props}
      helperText={error === true ? helperText : false}
    />
  );
}

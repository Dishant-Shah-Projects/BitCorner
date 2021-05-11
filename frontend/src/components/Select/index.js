import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export default function index(props) {
  const {
    onChange,
    pattern,
    helperText,
    error,
    name,
    options = [],
    valueKey = "value",
    displayKey = "displayValue",
  } = props;

  const customOnChangeHandler = (e) => {
    onChange({ ...e, target: { ...e.target, pattern: pattern } });
  };
  return (
    <TextField
      id={name}
      variant="outlined"
      fullWidth
      onBlur={customOnChangeHandler}
      onChange={customOnChangeHandler}
      {...props}
      helperText={error === true ? helperText : false}
      select
    >
      {options?.map((item) => {
        return <MenuItem value={item[valueKey]}>{item[displayKey]}</MenuItem>;
      })}
    </TextField>
  );
}
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
import { useState } from "react";

const setKeysToFalse = (jsonObject) => {
  const newisValidObj = { ...jsonObject };
  Object.keys(newisValidObj).forEach((value) => (newisValidObj[value] = false));
  return newisValidObj;
};

const removedNotAllowedValues = (value, notAllowedRegexString) => {
  let newVaue = value;
  if (notAllowedRegexString) {
    const notAllowedRegex = new RegExp(notAllowedRegexString, "g");
    newVaue = newVaue.replace(notAllowedRegex, "");
  }
  return newVaue;
};

const validateRegex = (value, pattern) => {
  if (pattern) {
    const validRegex = new RegExp(pattern, "g");
    const valid = validRegex.test(value);
    return valid;
  }
  return true;
};

const setFormInitValidity = (initialValidtyObj) =>
  Object.values(initialValidtyObj).every((item) => item);

// eslint-disable-next-line max-lines-per-function
export const useForm = (
  initialValues = {},
  initialValidity = setKeysToFalse(initialValues)
) => {
  const [values, setValues] = useState(initialValues);
  const [isValid, setFieldValid] = useState(initialValidity);
  const [errors, setErrors] = useState(setKeysToFalse(initialValues));
  const [isFormValid, setIsFormValid] = useState(
    setFormInitValidity(initialValidity)
  );
  // --
  // eslint-disable-next-line max-statements
  const handleInputChange = (event) => {
    // Fetch needed attribute of targeted element
    const { name, value, pattern } = event.target;

    // If unwanted key is pressed then remove not allowed value and update value
    // const dontAllow = event?.target?.getAttribute('data-dontallow');
    // const newValue = removedNotAllowedValues(value, dontAllow);
    const newValue = value;

    // Update value in state
    setValues({ ...values, [name]: newValue });

    const isValueValid = validateRegex(newValue, pattern);
    const newisValidObj = { ...isValid, [name]: isValueValid };

    setFieldValid(newisValidObj);

    if (isValueValid) setErrors({ ...errors, [name]: false });

    if (event.type === "blur") {
      setErrors({ ...errors, [name]: !isValueValid });
    }

    const allValid = Object.values(newisValidObj).every(Boolean);
    setIsFormValid(allValid);
  };

  const formSubmit = (event, customCallBack) => {
    if (event) event.preventDefault();
    if (isFormValid) {
      if (customCallBack) {
        customCallBack();
      }
    }
  };

  return {
    errors,
    setErrors,
    formSubmit,
    handleInputChange,
    isFormValid,
    isValid,
    setFieldValid,
    setValues,
    values,
    setIsFormValid
  };
};

export default useForm;
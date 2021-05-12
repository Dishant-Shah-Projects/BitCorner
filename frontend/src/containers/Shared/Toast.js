import React from "react";
import ToastComponent from "../../components/Toast";
import { connect } from "react-redux";

export function Toast(props) {
  const { toastData, clearToastData } = props;
  return (
    <>
      {toastData && (
        <ToastComponent
          severity={toastData?.severity}
          message={toastData?.message}
          clearMessage={clearToastData}
        />
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    toastData: state.global.toastData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearToastData: () => {
      dispatch({ type: "CLEAR_TOAST_DATA" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);

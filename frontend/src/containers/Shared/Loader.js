import React from "react";
import LoaderComponent from "../../components/Loader";
import { connect } from "react-redux";

export function Loader(props) {
  const { loading } = props;
  return <>{loading > 0 && <LoaderComponent />}</>;
}
const mapStateToProps = (state) => {
  return {
    loading: state.global.loading,
  };
};
export default connect(mapStateToProps, null)(Loader);

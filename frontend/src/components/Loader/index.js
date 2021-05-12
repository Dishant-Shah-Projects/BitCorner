import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import './index.css';

export default function CircularUnderLoad() {
  return (
    <div className="loading">
      <CircularProgress disableShrink />
    </div>
  );
}

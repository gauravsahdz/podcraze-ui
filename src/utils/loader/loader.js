import React from "react";
import "../../components/css/loader.css";

const Loader = ({isLoading}) => {
  return isLoading ? (
    <div className="loader-overlay">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Loader;

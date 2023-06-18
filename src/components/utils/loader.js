import React from 'react';
import '../css/loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

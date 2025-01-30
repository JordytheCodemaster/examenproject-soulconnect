import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <ClipLoader color="black" size={50} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

export default Spinner;

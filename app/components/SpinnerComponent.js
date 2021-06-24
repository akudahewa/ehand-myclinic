import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const LoadSpinner = (props) => {
  return (
    <Spinner
      visible={props.loading}
      color="#1d72a3"
      size="large"
      animation="fade"
      overlayColor="white"
      textContent={props.loadingText}
      textStyle={{ color: "#1d72a3" }}
    />
  );
};

export default LoadSpinner;

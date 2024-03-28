import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";

const GoogleLoginButton = ({
  onSuccess,
  onFailure,
  clientId,
  buttonText,
  cookiePolicy,
  className,
}) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onFailure={onFailure}
      clientId={clientId}
      buttonText={buttonText}
      cookiePolicy={cookiePolicy}
      className={className}
    />
  );
};

GoogleLoginButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  cookiePolicy: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default GoogleLoginButton;

import React from "react";
import "./LoginSignUp.css";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

const LoginSignUp = ({ onGoogleLogin }) => {
  return (
    <div>
      <GoogleLoginButton
        onSuccess={onGoogleLogin}
        onFailure={onGoogleLogin}
        clientId="882008211267-hm9q7m1g6ogig1j1nj1kug0tju1a96i4.apps.googleusercontent.com"
        buttonText="Login with Google"
        cookiePolicy={"single_host_origin"}
        className="google-login-button"
      />
    </div>
  );
};

export default LoginSignUp;

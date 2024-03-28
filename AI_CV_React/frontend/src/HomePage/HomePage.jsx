import { useState, useEffect } from "react";
import "./HomePage.css";
import LoginSignUp from "../Login/LoginSignUp.jsx";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const HomePage = ({ setUser, setLoggedIn }) => {
  const responseGoogle = async (response) => {
    const credential = response.credential;
    try {
      const backendResponse = await axios.post(
        "http://localhost:8080/process-google-token",
        credential
      );
      const jwtToken = backendResponse.data.token;
      localStorage.setItem("jwtToken", jwtToken);
      const decodedToken = jwtDecode(jwtToken);

      if (decodedToken) {
        setUser({
          userid: decodedToken.userid,
          email: decodedToken.sub,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
        });

        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error sending access token to backend", error);
    }
  };
  return (
    <div className="img-container">
      <div className="home-container">
        <h1 className="home-title">Project - AI CV Template </h1>
        <p className="home-description">
          Tool for data extraction, reformating, restructuring and proofreading
          information from cvs. Join to upload your cv.
        </p>
        <LoginSignUp onGoogleLogin={responseGoogle} />
      </div>
    </div>
  );
};

export default HomePage;

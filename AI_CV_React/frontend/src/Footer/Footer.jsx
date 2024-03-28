import React from "react";
import "./Footer.css";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <img
              className="logo-image"
              src="public/AI_CV_Logo.png"
              alt="logo image"
            />
          </div>
          <div className="footer-col">
            <h4>Home</h4>
            <nav>
              <ul>
                <Link className="footer-link" to="/home-page">
                  Home Preview
                </Link>
                <Link className="footer-link" to="/pdf-upload">
                  Upload Pdf
                </Link>
              </ul>
            </nav>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <nav>
              <ul>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="social-links">
              <ul>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rights">
            Copyright ©2024 AI CV Template, All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

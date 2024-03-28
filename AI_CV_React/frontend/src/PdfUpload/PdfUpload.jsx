import React, { useState, useMemo } from "react";
import axios from "axios";
import "./PdfUpload.css";
import PdfDownload from "../PdfDownload/PdfDownload";
import CvTemplate from "../cv/CvTemplate";

const PdfUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [gmail, setGmail] = useState("");
  const [uploadSuccessful, setIsUploadSuccessful] = useState(true);
  const [response, setResponse] = useState(null);
  const [validEmail, setValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleGmailChange = (event) => {
    const { value } = event.target;
    setGmail(value);
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const embeddedPdf = useMemo(() => {
    if (selectedFile) {
      const pdfUrl = URL.createObjectURL(selectedFile);
      return (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          type="application/pdf"
          className="preview"
        />
      );
    } else {
      return null;
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    const storedToken = localStorage.getItem("jwtToken");
    const isValidEmail = validateEmail(gmail);
    setValidEmail(isValidEmail);
    if (selectedFile && gmail && isValidEmail) {
      const emailExistsResponse = await axios.get(
        `http://localhost:8080/person/emailExists/${gmail}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (emailExistsResponse.data) {
        setErrorMessage("Email already exists in the database.");
        return;
      }

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("gmail", gmail);

      axios
        .post("http://localhost:8080/pdf/upload", formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSelectedFile(null);
          setGmail("");
          setResponse(response);
          setErrorMessage(null);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      setErrorMessage("Please select a file and enter a valid Gmail address.");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div id="upload-div">
      <label id="upload-pdf">Upload PDF:</label>
      <i className="fa fa-download" aria-hidden="true"></i>
      <label
        className="enter-gmail-label"
        htmlFor="upload-file-input"
        id="upload-file-label"
      >
        {selectedFile ? (
          <>
            {embeddedPdf}
            <button onClick={handleRemove} id="remove-button">
              Remove PDF
            </button>
          </>
        ) : (
          "Choose PDF File"
        )}
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        id="upload-file-input"
      />
      <label htmlFor="gmail-input" className="input-label">
        Enter Email Address:
      </label>
      <input
        type="email"
        id="gmail-input"
        value={gmail}
        onChange={handleGmailChange}
        className="input-field"
      />
      <button className="upload-btn" onClick={handleUpload} id="upload-button">
        Upload PDF
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {response && (
        <div>
          <pre>{response.data}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;

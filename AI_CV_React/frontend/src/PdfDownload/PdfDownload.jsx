import React, { useEffect, useState, useRef } from "react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import CvTemplate from "../cv/CvTemplate";
import SearchCv from "../cv/SearchCv";
import "./PdfDownload.css";
import { useReactToPrint } from "react-to-print";
import SearchHistory from "../activity/SearchHistory";
import UploadHistory from "../activity/UploadHistory";

const ComponentToPrint = React.forwardRef(
  (
    {
      personId,
      personEmail,
      email,
      personName,
      personSummary,
      technologies,
      education,
      experiences,
      onAddInformation,
    },
    ref
  ) => (
    <div ref={ref}>
      <CvTemplate
        personId={personId}
        personEmail={personEmail}
        personName={personName}
        personSummary={personSummary}
        technologies={technologies}
        education={education}
        experiences={experiences}
        onAddInformation={onAddInformation}
      />
    </div>
  )
);

const PdfDownload = ({ email }) => {
  const [personId, setPersonId] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personEmailSave, setPersonEmailSave] = useState("");
  const [personData, setPersonData] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personSummary, setPersonSummary] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleAddInformation = () => {
    if (selectedItem != null) {
      fetchCVTemplate(selectedItem);
    } else {
      fetchByEmail(personEmailSave);
    }
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputEmail === "") {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(inputEmail)) {
      setEmailError("Enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const fetchByEmail = async (email) => {
    const storedToken = localStorage.getItem("jwtToken");

    const isValid = validateEmail(email);
    if (personId != null) {
      if (isValid) {
        try {
          const emailExistsResponse = await axios.get(
            `http://localhost:8080/person/emailExists/${email}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (!emailExistsResponse.data) {
            setEmailError("Person with this email doesn't exist");
            return;
          } else {
            setEmailError("");
          }
        } catch (error) {
          setEmailError("An error occurred while checking email existence");
          return;
        }
      }
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/person/${email}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setPersonId(response.data.id);
      setPersonEmail(response.data.email);
      setPersonEmailSave(personEmail);
      setPersonData(response.data);
      setPersonName(response.data.name);
      setPersonSummary(response.data.summary);
      setExperiences(response.data.experience);
      setEducation(response.data.education);
      setTechnologies(response.data.technologies);
      clearInput();
    } catch (error) {
      setEmailError("An error occurred while fetching person data");
    }
  };

  const fetchCVTemplate = async (item) => {
    try {
      fetchByEmail(item.personEmail);
      setPersonEmailSave(item.personEmail);
    } catch (error) {
      setEmailError("Error fetching CV template:", error);
    }
  };

  const handleSearchItemClicked = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
      fetchCVTemplate(item);
    }
  };

  const handleInputChange = (e) => {
    setPersonEmail(e.target.value);
    setPersonId(e.target.value);
  };

  const clearCvTemplate = () => {
    setPersonData(null);
    setPersonName(null);
    setPersonSummary(null);
    setTechnologies([]);
    setEducation([]);
    setExperiences([]);
  };

  const handleButtonClick = () => {
    const isValid = validateEmail(personId);
    if (isValid) {
      fetchByEmail(personId);
    } else {
      clearCvTemplate();
    }
  };

  const clearInput = () => {
    setPersonEmail("");
  };

  useEffect(() => {
    if (email) {
      fetchByEmail(email);
    }
  }, [email]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (personData != null) {
    const { id, email, name, summary, education, experiences } = personData;
  }

  return (
    <div id="download-div">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div className="search-section">
          <div className="section-label-search">Find CV & Download</div>
          <SearchCv
            email={personEmail}
            handleInputChange={handleInputChange}
            handleFetchData={handleButtonClick}
            clearInput={clearInput}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <button className="btn-download" onClick={handlePrint}>
            Download Pdf
          </button>
          <div className="tabs-container">
            <div className="tabs">
              <span
                className={activeTab === 0 ? "tab active" : "tab"}
                onClick={() => handleTabClick(0)}
              >
                Upload History
              </span>
              <span
                className={activeTab === 1 ? "tab active" : "tab"}
                onClick={() => handleTabClick(1)}
              >
                Search History
              </span>
            </div>
            <div className="tab-content">
              {activeTab === 0 && (
                <div className="content">
                  <UploadHistory
                    onSearchItemClicked={handleSearchItemClicked}
                  ></UploadHistory>
                </div>
              )}
              {activeTab === 1 && (
                <div className="content">
                  <SearchHistory
                    onSearchItemClicked={handleSearchItemClicked}
                  ></SearchHistory>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="cv-section">
          <div className="entire-cv">
            <ComponentToPrint
              ref={componentRef}
              personId={personId}
              personEmail={personEmail}
              personName={personName}
              personSummary={personSummary}
              technologies={technologies}
              education={education}
              experiences={experiences}
              onAddInformation={handleAddInformation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDownload;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CvTemplate.css";
import image from "/public/logo.png";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { startYear } from "../constants/constants.js";

const CvTemplate = ({
  personId,
  personEmail,
  personName,
  personSummary,
  technologies,
  education,
  experiences,
  onAddInformation,
}) => {
  const [editableIndex, setEditableIndex] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [showNewTechnologyInput, setShowNewTechnologyInput] = useState(false);
  const [summary, setSummary] = useState("");
  const [personExperiences, setPersonExperiences] = useState([]);
  const [isParagraphClicked, setIsParagraphClicked] = useState(false);
  const [educationForm, setEducationForm] = useState({
    degree: "",
    college: "",
    startYear: "",
    endYear: "",
  });
  const [isStartYearVisible, setIsStartYearVisible] = useState(false);
  const [isEndYearVisible, setIsEndYearVisible] = useState(false);
  const [isEducationFormVisible, setIsEducationFormVisible] = useState(false);
  useEffect(() => {
    setPersonExperiences([...experiences]);
  }, [experiences]);

  useEffect(() => {
    setSummary(personSummary);
  }, [personSummary]);

  const handleSummaryChange = (newSummary) => {
    setSummary(newSummary);
  };

  const handleDeleteTechnology = (name) => {
    const storedToken = localStorage.getItem("jwtToken");
    const techToDelete = {
      name: name,
    };

    axios
      .delete(`http://localhost:8080/technology`, {
        data: techToDelete,
        params: { personId },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setNewTechnology("");
        setShowNewTechnologyInput(false);
        onAddInformation(personEmail);
      })
      .catch((error) => {
        console.error("Error removing technology:", error);
      });
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setIsParagraphClicked(true);
  };

  const handleSaveTechnology = () => {
    const storedToken = localStorage.getItem("jwtToken");
    const addTech = {
      name: newTechnology,
    };

    axios
      .post(`http://localhost:8080/technology`, addTech, {
        params: { personId },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setNewTechnology("");
        setShowNewTechnologyInput(false);
        onAddInformation(personEmail);
      })
      .catch((error) => {
        console.error("Error adding technology:", error);
      });
  };

  const handleCancel = (e) => {
    setShowNewTechnologyInput(false);
    e.stopPropagation();
  };

  const handleSaveExperience = (field, updatedValue, index) => {
    const updatedExperiences = [...personExperiences];
    updatedExperiences[index][field] = updatedValue;
    setPersonExperiences(updatedExperiences);
    setEditableIndex(-1);
    setIsParagraphClicked(true);
  };

  const handleSave = () => {
    const updatedPerson = {
      id: personId,
      email: personEmail,
      summary: summary,
      technologies: technologies,
      education: education,
      experience: personExperiences,
    };
    const storedToken = localStorage.getItem("jwtToken");
    axios
      .put(`http://localhost:8080/person/update`, updatedPerson, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setEditableIndex(-1);
        setIsParagraphClicked(false);
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const handleParagraphClick = (index) => {
    setEditableIndex(index);
    setShowNewTechnologyInput(false);
    setIsParagraphClicked(true);
  };

  const handleNewTechnologyChange = (e) => {
    setNewTechnology(e.target.value);
  };

  const handleEducationFormChange = (e) => {
    const { name, value } = e.target;
    setEducationForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    const storedToken = localStorage.getItem("jwtToken");
    axios
      .post(`http://localhost:8080/education`, educationForm, {
        params: { personId },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setEducationForm({
          degree: "",
          college: "",
          startYear: "",
          endYear: "",
        });
        setIsEducationFormVisible(false);
        onAddInformation(personEmail);
      })
      .catch((error) => {
        console.error("Error adding education:", error);
      });
  };

  const handleCancelEducation = (e) => {
    e.stopPropagation();
    setIsEducationFormVisible(false);
    setEducationForm({
      degree: "",
      college: "",
      startYear: "",
      endYear: "",
    });
  };

  useEffect(() => {
    setEducationForm({
      degree: "",
      college: "",
      startYear: "",
      endYear: "",
    });
    setIsEducationFormVisible(false);
    setShowNewTechnologyInput(false);
    setIsParagraphClicked(false);
  }, [personName]);

  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div>
      <div className="pdf-container">
        <div className="background"></div>
        <div id="cv" className="cv">
          <div id="nameAndRole">
            <img src={image} alt="edf" />
            <h1>{personName}</h1>
            {experiences.length > 0 && <h2>{experiences[0].role}</h2>}
          </div>
          <div id="all">
            <div id="STE">
              <div className="first">
                <h3>Summary</h3>
                <div className="line"></div>
                {editableIndex === personSummary ? (
                  <textarea
                    className="textArea"
                    defaultValue={summary}
                    rows={10}
                    onBlur={(e) => {
                      handleSummaryChange(e.target.value);
                      handleParagraphClick(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <p onClick={() => handleEdit(personSummary)}>{summary}</p>
                )}
              </div>
              <div className="first">
                <h3
                  id="technologiesR"
                  onClick={() => setShowNewTechnologyInput(true)}
                >
                  Technologies
                </h3>
                <div className="line"></div>
                <i>
                  {technologies.map((tech, index) => (
                    <React.Fragment key={index}>
                      <div className="technology-container">
                        <span
                          className="tech-name"
                          onClick={() => handleDeleteTechnology(tech.name)}
                        >
                          {tech.name}
                        </span>
                        <RemoveCircleRoundedIcon
                          id="delete-icon"
                          onClick={() => handleDeleteTechnology(tech.name)}
                        />
                      </div>
                      {index < technologies.length - 1 && (
                        <span className="comma">, </span>
                      )}
                    </React.Fragment>
                  ))}
                </i>
                {showNewTechnologyInput && (
                  <div id="tech">
                    <input
                      id="plAddTech"
                      type="text"
                      value={newTechnology}
                      onChange={handleNewTechnologyChange}
                      placeholder="Add new technology"
                    />

                    <div
                      className="save-icon-small"
                      onClick={handleSaveTechnology}
                    >
                      <i class="fa fa-check"></i>
                    </div>
                    <div className="cancel-icon-small" onClick={handleCancel}>
                      <i class="fa fa-times"></i>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="first"
                onClick={() =>
                  setIsEducationFormVisible(!isEducationFormVisible)
                }
              >
                <h3>Education</h3>
                <div className="line"></div>
                <ul>
                  {education.map((edu, index) => (
                    <li key={index}>
                      <i>
                        {edu.degree} - {edu.college}, {edu.startYear} -{" "}
                        {edu.endYear ? edu.endYear : "Present"}
                      </i>
                    </li>
                  ))}
                </ul>
                {isEducationFormVisible && (
                  <div id="educationForm" onClick={(e) => e.stopPropagation()}>
                    <div id="inputs">
                      <input
                        type="text"
                        placeholder="Degree"
                        name="degree"
                        value={educationForm.degree}
                        onChange={handleEducationFormChange}
                        className="inputField"
                      />
                      <input
                        type="text"
                        placeholder="College"
                        name="college"
                        value={educationForm.college}
                        onChange={handleEducationFormChange}
                        className="inputField"
                      />
                    </div>
                    <div id="years" className="form-group">
                      <div className="year-select-wrapper">
                        <div
                          className={`select-wrapper ${
                            isStartYearVisible ? "open" : ""
                          }`}
                          onClick={() =>
                            setIsStartYearVisible(!isStartYearVisible)
                          }
                        >
                          <input
                            type="text"
                            placeholder="Start Year"
                            name="startYear"
                            value={educationForm.startYear}
                            onChange={handleEducationFormChange}
                            className="inputField"
                            readOnly
                          />
                          <ul className="options">
                            {generateYears(startYear).map((year) => (
                              <li
                                key={year}
                                onClick={(e) => {
                                  handleEducationFormChange({
                                    target: { name: "startYear", value: year },
                                  });
                                  setIsStartYearVisible(false);
                                }}
                              >
                                {year}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="year-select-wrapper">
                        <div
                          className={`select-wrapper ${
                            isEndYearVisible ? "open" : ""
                          }`}
                          onClick={() => setIsEndYearVisible(!isEndYearVisible)}
                        >
                          <input
                            type="text"
                            placeholder="End Year"
                            name="endYear"
                            value={educationForm.endYear}
                            onChange={handleEducationFormChange}
                            className="inputField"
                            readOnly
                          />
                          <ul className="options">
                            {generateYears(
                              parseInt(educationForm.startYear) || startYear
                            ).map((year) => (
                              <li
                                key={year}
                                onClick={() => {
                                  handleEducationFormChange({
                                    target: { name: "endYear", value: year },
                                  });
                                  setIsEndYearVisible(false);
                                }}
                              >
                                {year}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div id="choice">
                      <div className="save-icon" onClick={handleAddEducation}>
                        <i class="fa fa-check">Save</i>
                      </div>
                      <div
                        className="cancel-icon"
                        onClick={handleCancelEducation}
                      >
                        <i class="fa fa-times">Cancel</i>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div id="Experience">
              <h3>Experience</h3>
              <div className="line"></div>
              {experiences.map((exp, index) => (
                <div
                  className="exp"
                  key={index}
                  style={{ paddingTop: index === 0 ? 0 : "5mm" }}
                >
                  <h4 id="role">{exp.role}</h4>
                  <div id="CR">
                    <h4 id="company">{exp.companyName}</h4>
                    <h4 id="when">
                      {exp.startYear} - {exp.endYear || "Present"}
                    </h4>
                  </div>
                  {editableIndex === index ? (
                    <textarea
                      className="textArea"
                      defaultValue={exp.description}
                      onBlur={(e) =>
                        handleSaveExperience(
                          "description",
                          e.target.value,
                          index
                        )
                      }
                      rows={10}
                      autoFocus
                    />
                  ) : (
                    <p
                      id="description"
                      onClick={() => handleParagraphClick(index)}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {isParagraphClicked && (
            <button onClick={handleSave}>Save changes</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvTemplate;

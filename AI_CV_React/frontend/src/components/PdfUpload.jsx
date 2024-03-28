import React, { useState } from "react";

const PdfUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onUpload(file); // Trigger the callback with the selected file
  };

  return (
    <div>
      <label>Upload PDF:</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  );
};

export default PdfUpload;

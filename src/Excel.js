// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

export const Excel = ({ userData, setUserData, history }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //console.log(response.data);
      setError(null);
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.invalidRecords);
    }
  };

  return (
    <div className="App">
      <h1>Excel Validator</h1>
      <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && (
        <div>
          <h2>Invalid Records:</h2>
          <ul>
            {error.map((record, index) => (
              <li key={index}>{`Record ${index + 1}: College Name: ${record.college_name}, Email: ${record.Email}, University: ${record.university}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

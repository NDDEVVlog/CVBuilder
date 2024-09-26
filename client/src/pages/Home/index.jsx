import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const handleOnClick = () => {
    axios.get('http://localhost:3001/getTestData')
      .then(response => {
        console.log(response.data);
        setResponseData(response.data); // Save response data in the state
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleNavigateToMyResumes = () => {
    navigate('/MyResumes'); // Navigate to /MyResumes route
  }

  return (
    <div className='homeContainer'>
      <button className='buttonTest' onClick={handleOnClick}>Get data</button>
      <button className='buttonNavigate' onClick={handleNavigateToMyResumes}>Go to My Resumes</button> {/* New Navigation Button */}
      
      {/* Display data if available */}
      {responseData && (
        <div className='dataDisplay'>
          <p>Name: {responseData.name}</p>
          <p>Age: {responseData.age}</p>
          <p>Job: {responseData.job}</p>
        </div>
      )}
    </div>
  );
}

export default Home;

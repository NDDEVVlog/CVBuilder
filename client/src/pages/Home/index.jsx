import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [responseData, setResponseData] = useState(null);

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

  return (
    <div className='homeContainer'>
      <button className='buttonTest' onClick={handleOnClick}> Get data </button>
      
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

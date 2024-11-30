import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  
  const gotoCreate = () => {
    navigate('/CreateResume'); // Navigate to /Create Resume
  }

  const gotoLogin = () => {
    navigate('/Login'); // Navigate to Login
  }

  return (
    
     <div>
      
      <nav className="navbar bg-body-tertiary shadow" id='nav-create'>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Pictures/logo.png" alt="Logo" height="24" className="d-inline-block align-text-top" />
            <b>CV</b> <span>Online Builder</span>
          </a>
          <div className="btns">
            <button className="btn btn-sm btn-dark" >
              <i className=" bi bi-person-circle" /> FAQ
            </button>
            
            <button type="button" onClick={gotoLogin} className="btn btn-sm btn-dark" >
              <i className="bi bi-person-circle" /> Login  
            </button>
            <button type="button" onClick={gotoCreate} className="btn btn-sm btn-danger">
              <i className="bi bi-person-circle" /> Make a CV
            </button>
          </div>
        </div>
      </nav>

      <div class="hometext1">
        <p> Create your CV with ease </p>
      </div>

      <div class="hometext2">
        <p>Fast. Free. With guidelines</p>
      </div>

      </div>
      
    

      

  );
}

export default Home;
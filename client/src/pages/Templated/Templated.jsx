import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Templated.css';

const Templated = () => {
  
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
              <i className="bi bi-person-circle" /> My Profile
            </button>
            <button className="btn btn-sm btn-danger">
              <i className="bi bi-box-arrow-left" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="whiteboard bg-white rounded shadow  mt-4" style={{ minHeight: '90vh'}}>
          <div className="d-flex justify-content-between border-bottom">
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default Templated;

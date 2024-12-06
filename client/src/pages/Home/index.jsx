import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Corrected image paths, assuming the images are in the public/Pictures directory
  const images = [
    '/Pictures/CV1.PNG', 
    '/Pictures/CV2.PNG',
    '/Pictures/CV3.PNG'
  ];

  const navigate = useNavigate();

  // Function to go to the Create Resume page
  const gotoCreate = () => {
    navigate('/CreateResume');
  };

  // Function to go to the Login page
  const gotoLogin = () => {
    navigate('/Login');
  };

  // Effect to change the image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through the images
    }, 10000); // 10 seconds interval

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow" id='nav-create'>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Pictures/logo.png" alt="Logo" height="24" className="d-inline-block align-text-top" />
            <b>CV</b> <span>Online Builder</span>
          </a>
          <div className="btns">
            <button className="btn btn-sm btn-dark">
              <i className="bi bi-person-circle" /> FAQ
            </button>
            <button type="button" onClick={gotoLogin} className="btn btn-sm btn-dark">
              <i className="bi bi-person-circle" /> Login  
            </button>
            <button type="button" onClick={gotoCreate} className="btn btn-sm btn-danger">
              <i className="bi bi-person-circle" /> Make a CV
            </button>
          </div>
        </div>
      </nav>

      {/* Image slider */}
      <div className="image-container">
        <img
          src={images[currentImageIndex]}
          alt="Slider Image"
          className="slider-image"
        />
      </div>

      <div className="hometext1">
        <p> Create your CV with ease </p>
      </div>

      <div className="hometext2">
        <p>Fast. Free. With guidelines</p>
      </div>
    </div>
  );
}

export default Home;

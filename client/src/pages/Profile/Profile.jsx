import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    dob: '',
    country: '',
    phone: '',
    sex: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfileClick = async () => {
    // Display the form data (or handle it as needed)
    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      alert('Profile data saved successfully!');
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save profile data.');
    }


    alert(`Profile Data: 
    Name: ${formData.fullName}
    Email: ${formData.email}
    Address: ${formData.address}
    DOB: ${formData.dob}
    Country: ${formData.country}
    Phone: ${formData.phone}
    Sex: ${formData.sex}`);
  };

  return (
    <div style={{ backgroundColor: '#E8E8FC', minHeight: '100vh' }}>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Resumes</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <link rel="icon" href="logo.png" />

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      />
      <link rel="stylesheet" type="text/css" href="profile.css" />
      {/* <video src="background.mp4" preload autoPlay loop muted /> */}
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="/Pictures/logo.png"
              alt="Logo"
              height={24}
              className="d-inline-block align-text-top"
            />
            <b>CV</b> Online Builder

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
        <div className="profile rounded shadow p-3">
          <div className="header d-flex justify-content-between custom-border">
            <h5>Edit Profile</h5>
            <div>
              <a className="text-decoration-none" href="#">
                <i className="bi bi-arrow-left-circle" /> Back
              </a>
            </div>
          </div>
          <div>
            <form className="row g-3 p-3">
              <div className="form col-md-6">

                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Dev Ninja"
                  className="form-control"
                />

              </div>
              <div className="form col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="dev@abc.com"
                  className="form-control"
                />
              </div>

              <div className="form col-12">
                <label className="form-label">Home Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="766 Võ Văn Kiệt, Phường 1, Quận 5, Hồ Chí Minh"
                  className="form-control"
                />
              </div>

              <div className="form col-md-6">
                <label className="form-label">Date Of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  className="form-control"
                />
              </div>
              <div className="form col-12">
                <label className="form-label">Home Address</label>
                <input type="text" placeholder="766 Võ Văn Kiệt, Phường 1, Quận 5, Hồ Chí Minh" className="form-control" />
              </div>
              <div className="form col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Vietnam"
                  className="form-control"
                />
              </div>
              <div className="form col-md-6">
                <label className="form-label">Phone number</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="xxxxxxxxxxx"
                  min={0}
                  max={99999999999}
                  className="form-control"
                />
              </div>
              <div className="form col-md-6">
                <label className="form-label">Sex</label>

                <select name="lang" id="lang-select">
               
                    <option value="">-------- Choose your sex --------</option>
                    <option value="csharp">Male</option>
                    <option value="cpp">Female</option>
                    <option value="php">Others</option>
                    <option value="ruby">Don't ask me !</option>
                </select>

              </div>
              <div className="col-12 text-end">
                <button className="animated-button text-end" onClick={handleSaveProfileClick}>
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                  <span className="text">Save Profile</span>
                  <span className="circle"></span>
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

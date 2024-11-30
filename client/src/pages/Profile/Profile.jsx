import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Profile.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'
import { UserContext } from 'LoginContext/UserContext';

const Profile = () => {

  const {state} = useContext(UserContext)
  const [user, setUser] = useState()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    dob: '',
    sex: '',
    religion: '',
    country: '',
    maritalStatus: 'Single',
    hobbies: '',
    languagesKnown: '',
    address: '',
    experiences: [{ jobTitle: "", company: "", startDate: "", endDate: "",description:"" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [{ name: "", level: "" }],
    socialLink: [{ platform: "", url: "" }],
    avatar: null,
  });



  
  // const id = state.userid
  // console.log(state)

  const navigate = useNavigate();


  useEffect(() => {
    if (!state.userId) {
      console.error('User ID is missing in the context state!');
      return;
    }
  
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('http://localhost:3001/api/users/getUser', {
          params: { id: state.userId },
        });
        console.log(userResponse.data);
  
        setUser(userResponse.data); // Set user data to state
        setFormData({
          fullName: userResponse.data.fullName || '',
          email: userResponse.data.email || '',
          address: userResponse.data.address || '',
          dob: userResponse.data.dob || '',
          country: userResponse.data.country || '',
          phone: userResponse.data.phone || '',
          sex: userResponse.data.sex || '',
        });
  
        // Fetch profile data to check if it exists
        const profileResponse = await axios.get('http://localhost:3001/profile/getProfile', {
          params: { id: state.userId },
        });
  
        // If profile exists, navigate to /CreateResume
        if (profileResponse.data && profileResponse.data._id) {
          navigate('/CreateResume');  // Profile exists, redirect
        } else {
          // Handle case where profile does not exist
          console.log('Profile does not exist.');
          // Optionally, redirect to a profile creation page or show a message
           navigate('/CreateProfile');
        }
  
      } catch (err) {
        console.error('Error fetching user data or profile data:', err);
        // Optional: Show user-friendly error message if necessary
      }
    };
  
    fetchData();
  }, [state.userId, navigate]);  // Include navigate in dependency array


  console.log(user)
  console.log(state)

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfileClick = async (e) => {
    e.preventDefault();
    
    if (!state.userId) {
      console.error('User ID is missing!');
      return;
    }
  
    const profileData = {
      userId: state.userId, // Add the userId here
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      dob: formData.dob,
      country: formData.country,
      phone: formData.phone,
      sex: formData.sex,
    };
  
    try {
      const response = await fetch('http://localhost:3001/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      if (response.ok) {
        navigate('/CreateResume'); // Adjust this to your target route
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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      <link rel="stylesheet" type="text/css" href="Profile.css" />
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Pictures/logo.png" alt="Logo" height={24} className="d-inline-block align-text-top" />
            <b> CV</b><span>Online Builder</span>
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
                <label className="form-label">First Name</label>
                <input type="text" name="fullName" value={formData.fullName } onChange={handleChange} placeholder="Dev Ninja" className="form-control" />
              </div>
              {/* <div className="form col-md-6">
                <label className="form-label">Last Name</label>
                <input type="text" placeholder="Dev Ninja" className="form-control" />
              </div> */}
              <div className="form col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="dev@abc.com"
                  className="form-control"
                  readOnly
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
                <input type="text"  name = "address" value = {formData.address} onChange={handleChange} placeholder="766 Võ Văn Kiệt, Phường 1, Quận 5, Hồ Chí Minh" className="form-control" />
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

                <select name="sex" id="sex" value={formData.sex} onChange={handleChange}>
               
                    <option value="">-------- Choose your sex --------</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
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

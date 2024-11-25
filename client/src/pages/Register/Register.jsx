import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Register.css'; // Assuming the CSS is in the same folder

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [message, setMessage] = useState('');

    // Validate form data
    const validateForm = () => {
      if (firstName.trim() === '' || lastName.trim() === '' || password.trim() === ''|| email.trim()==='') {
          setError('Please fill in all fields.');
          return false;
      }
      //if (!/\S+@\S+\.\S+/.test(email)) {
      //    setError('Email is not valid.');
      //    return false;
      //}
      if (password.length < 6) {
          setError('Password must be at least 6 characters long.');
          return false;
      }
      if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return false;
      }
      return true;
  };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Before Validation");
        setError('');
        setSuccess('Đăng ký thành công!');
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3001/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, password,email }),
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage('Registration successful!');
                } else {
                    console.error('Registration failed:', data);
                    setMessage(data.message || 'Registration failed!');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setMessage('Error during registration. Please try again.');
            }
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="/Pictures/logo.png" alt="Logo" height={24} className="d-inline-block align-text-top" />
                        <b> CV</b><span>Online Builder</span>
                    </a>
                    <div className='btns'>
                        <button className="btn btn-sm btn-dark"><i className="bi bi-person-circle" /> My Profile</button>
                        <button className="btn btn-sm btn-danger"><i className="bi bi-box-arrow-left" /> Logout</button>
                    </div>
                </div>
            </nav>

            <div className="form-register rounded-4">
                <form onSubmit={handleSubmit} className="register-box">
                    <div className="box-logo d-flex gap-2 justify-content-center">
                        <img className="mb-4" src="/Pictures/logo.png" alt="logo" height="70" />
                        <div>
                            <h1 className="h3 fw-normal my-1"><b>CV</b> <span>Online Builder</span></h1>
                            <p className="m-0">Create your new account</p>
                        </div>
                    </div>

                    {/* Input fields */}
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control form-control-register"
                            id="floatingFirstName"
                            placeholder=""
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor="floatingFirstName"><i className="bi bi-person"></i> First Name</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control form-control-register"
                            id="floatingLastName"
                            placeholder=""
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="floatingLastName"><i className="bi bi-person"></i> Last Name</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control form-control-register"
                            id="floatingEmail"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingEmail"><i className="bi bi-envelope"></i> Email address</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control form-control-register"
                            id="floatingPassword"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword"><i className="bi bi-key"></i> Password</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control form-control-register"
                            id="floatingConfirmPassword"
                            placeholder=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="floatingConfirmPassword"><i className="bi bi-key"></i> Confirm your Password</label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="button-register type2">Register</button>

                    {/* Display error message */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="forgot-login d-flex justify-content-between my-3">
                        <a href="Login" className="login-register">You have an account?</a>
                    </div>
                </form>
            </div>
            {/* Display success/error messages */}
            {message && <div className="alert alert-info">{message}</div>}
        </div>
    );
};

export default Register;

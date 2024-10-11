import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Ensure this line is present

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }), // Ensure you send the correct field names
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed'); // Use the server's error message
        }

        const data = await response.json();
        console.log('Login successful:', data);
        // Handle successful login here (e.g., redirect, store token, etc.)
        setError(''); // Clear error on successful login
    } catch (err) {
        console.error('Error:', err);
        setError(err.message); // Set error message
    }
};


  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>CV Maker | Login</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
      <link rel="icon" href="logo.png" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      <link rel="stylesheet" type="text/css" href="login.css" />
      <video src="background.mp4" preload autoPlay loop muted className="background-video" />

      <div className="content w-100">
        <div className="form-signin m-auto shadow rounded-4">
          <form onSubmit={handleLogin}>
            <div className="d-flex gap-2 justify-content-center">
              <img className="mb-4" src="/Pictures/logo.png" alt="Logo" height={70} />
              <div>
                <h1 className="h3 fw-normal my-1"><b>CV</b> <span style={{ color: '#F4a950' }}>Online Builder</span></h1>
                <p className="m-0">Login to your account</p>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input 
                onChange={e => setEmail(e.target.value)} 
                type="email" 
                className="form-control" 
                id="floatingEmail" 
                placeholder="name@example.com" 
                value={email} 
                required 
              />
              <label htmlFor="floatingEmail"><i className="bi bi-envelope" /> Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input 
                onChange={e => setPassword(e.target.value)} 
                type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password" 
                value={password} 
                required 
              />
              <label htmlFor="floatingPassword"><i className="bi bi-key" /> Password</label>
            </div>
            <button className="btn w-100 py-2" style={{ backgroundColor: '#f9d342' }} type="submit">
              Login <i className="bi bi-box-arrow-in-right" />
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Error message */}
            <div className="forgot-regis d-flex justify-content-between my-3">
              <a href="forgot-password.html" className="forgot-pass">Forgot Password?</a>
              <a href="register.html" className="register">Register</a>
            </div>
          </form>
        </div>
        <div className="footer">
          <p>@This website is produced by: Nguyễn Duy, Danh Huy, Phúc Nguyên</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

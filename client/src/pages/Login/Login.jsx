import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={{ backgroundColor: '#E8E8FC', minHeight: '100vh' }}> {/* Set background color to black */}

      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>CV Maker | Login</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
      <link rel="icon" href="logo.png" color='#000'/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      <link rel="stylesheet" type="text/css" href="Login.css" /> 

      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Pictures/logo.png" alt="Logo" height="24" className="d-inline-block align-text-top" />
            <b> CV</b><span>Online Builder</span>
          </a>
          <div>

          </div>
        </div>
      </nav>

      <div className="content w-100">
        <div className="form-signin rounded-4">
          <div>
            <div className="logo d-flex gap-2 justify-content-center">
              <img className="mb-4" src="/Pictures/logo.png" alt="" height={70} />
              <div>
                <h1 className="h3 fw-normal my-1"><b>CV</b> <span style={{ color: '#7573CF' }}>Online Builder</span></h1>
                <p className="m-0">Login to your account</p>
              </div>
            </div>
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingEmail" placeholder="" />
              <label className="Log" htmlFor="floatingInput"><i className="bi bi-envelope" /> Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="" />
              <label className="Pass" htmlFor="floatingPassword"><i className="bi bi-key" /> Password</label>
            </div>

            <button class="button type1"></button>
            <div className="forgot-regis d-flex justify-content-between my-3">
              <a href="forgot-password.html" className="forgot-pass">Forgot Password ?</a>
              <a href="Register" className="register">Register</a>
            </div>
          </div>       
        </div>
        <div className="footer">
          <p>@This website is produced by: Nguyễn Duy, Danh Huy, Phúc Nguyên</p>
        </div>
      </div>
    </div>
  );
}


export default Login;

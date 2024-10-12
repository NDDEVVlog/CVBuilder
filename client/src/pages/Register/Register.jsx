import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Register.css'; // Assuming the CSS is in the same folder

function Register() {
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
            <div className="register-box">
              <div className="box-logo d-flex gap-2 justify-content-center">
                <img className="mb-4" src="/Pictures/logo.png" alt="logo" height="70" />
                <div>
                  <h1 className="h3 fw-normal my-1"><b>CV</b> <span>Online Builder</span></h1>
                  <p className="m-0">Create your new account</p>
                </div>
              </div>
              <div className="form-floating">
                <input type="text" className="form-control form-control-register" id="floatingName" placeholder="" />
                <label htmlFor="floatingInput"><i className="bi bi-person"></i> First Name</label>
              </div>
              <div className="form-floating">
                <input type="text" className="form-control form-control-register" id="floatingName" placeholder="" />
                <label htmlFor="floatingInput"><i className="bi bi-person"></i> Last Name</label>
              </div>
              <div className="form-floating">
                <input type="email" className="form-control form-control-register" id="floatingEmail" placeholder="" />
                <label htmlFor="floatingInput"><i className="bi bi-envelope"></i> Email address</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control form-control-register" id="floatingPassword" placeholder="" />
                <label htmlFor="floatingPassword"><i className="bi bi-key"></i> Password</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control form-control-register" id="floatingPassword" placeholder="" />
                <label htmlFor="floatingPassword"><i className="bi bi-key"></i> Confirm your Password</label>
              </div>
              <button class="button-register type2"></button>
              <div className="forgot-login d-flex justify-content-between my-3">
                <a href="Login" className="login-register">You have an account ?</a>
              </div>
            </div>
          </div>
        </div>
  );
}

export default Register;

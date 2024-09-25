import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './MyResumes.css';
const MyResumes = () => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/Pictures/logo.png" alt="Logo" height="24" className="d-inline-block align-text-top" />
            Resume Builder
          </a>
          <div>
            <button className="btn btn-sm btn-dark">
              <i className="bi bi-person-circle"></i> Profile
            </button>
            <button className="btn btn-sm btn-danger">
              <i className="bi bi-box-arrow-left"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="bg-white rounded shadow p-2 mt-4" style={{ minHeight: "80vh" }}>
          <div className="d-flex justify-content-between border-bottom">
            <h5>Resumes</h5>
            <div>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-file-earmark-plus"></i> Add New
              </a>
            </div>
          </div>

          <div className="text-center py-3 border rounded mt-3" style={{ backgroundColor: "rgba(236, 236, 236, 0.56)" }}>
            <i className="bi bi-file-text"></i> No Resumes Available
          </div>

          <div className="d-flex flex-wrap">
            <div className="col-12 col-md-6 p-2">
              <div className="p-2 border rounded">
                <h5>Web Developer Consultant</h5>
                <p className="small text-secondary m-0" style={{ fontSize: "12px" }}>
                  <i className="bi bi-clock-history"></i> Last Updated 23 September, 2023 08:09 AM
                </p>
                <div className="d-flex gap-2 mt-1">
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-file-text"></i> Open
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-pencil-square"></i> Edit
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-trash2"></i> Delete
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-share"></i> Share
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-copy"></i> Clone
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 p-2">
              <div className="p-2 border rounded">
                <h5>Web Developer Consultant</h5>
                <p className="small text-secondary m-0" style={{ fontSize: "12px" }}>
                  <i className="bi bi-clock-history"></i> Last Updated 23 September, 2023 08:09 AM
                </p>
                <div className="d-flex gap-2 mt-1">
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-file-text"></i> Open
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-pencil-square"></i> Edit
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-trash2"></i> Delete
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-share"></i> Share
                  </a>
                  <a href="#" className="text-decoration-none small">
                    <i className="bi bi-copy"></i> Clone
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>
        {`
          body {
            height: 100vh;
            background: radial-gradient(circle, rgba(249, 249, 249, 1) 0%, rgba(240, 232, 127, 1) 49%, rgba(246, 243, 132, 1) 100%);
          }
        `}
      </style>
    </div>
  );
};

export default MyResumes;

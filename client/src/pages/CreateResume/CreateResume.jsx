import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CreateResume.css';

const MyResumes = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    dob: '',
    gender: 'Male',
    religion: 'Hindu',
    nationality: 'Indian',
    maritalStatus: 'Single',
    hobbies: '',
    languagesKnown: '',
    address: '',
    experiences: [{ }],
    education: [{  }],
    skills: [''],
  });

  useEffect(() => {
    document.title = 'My Resumes';
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { title: '', company: '', start: '', end: '', description: '' }],
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '' }],
    });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ''],
    });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperiences = formData.experiences.map((exp, i) => (i === index ? { ...exp, [name]: value } : exp));
    setFormData((prevData) => ({
      ...prevData,
      experiences: updatedExperiences,
    }));
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = formData.education.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu));
    setFormData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  const handleSkillChange = (e, index) => {
    const updatedSkills = formData.skills.map((skill, i) => (i === index ? e.target.value : skill));
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: prevData.experiences.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveSkill = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        avatar: reader.result, // Convert image to base64 and store
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow" id='nav-create'>
        <div className="container">
          <a className="navbar-brand" href="Home">
            <img src="/Pictures/logo.png" alt="Logo" height="24" className="d-inline-block align-text-top" />
            <b>CV</b> <span>Online Builder</span>
          </a>
          <div className="btns">
            <a href='Profile'>
            <button className="btn btn-sm btn-dark">
              <i className="bi bi-person-circle" /> My Profile
            </button>
            </a>
            <a href='Login'>
            <button className="btn btn-sm btn-danger">
              <i className="bi bi-box-arrow-left" /> Logout
            </button>
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="bg-white rounded shadow p-2 mt-4" style={{ minHeight: '80vh' }}>
          <div className="d-flex justify-content-between border-bottom">
            <h5>Create Resume</h5>
            <div>
              <a href="" className="text-decoration-none"><i className="bi bi-arrow-left-circle"></i> Back</a>
            </div>
          </div>

          <form className="row g-3 p-3">
          {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">
                    <i className="bi bi-person-circle"></i>
                  </div>
                )}
              <div className="avatar-container">
                <span>Your avatar</span>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="form-control mt-2" />
              </div>

              
            <h5 className="mt-3 text-secondary"><i className="bi bi-person-badge"></i> Personal Information</h5>
            {/* Avatar Container */}
    

            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Dev Ninja" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="dev@abc.com" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Mobile No</label>
              <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} placeholder="9569569569" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date Of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Religion</label>
              <select className="form-select" name="religion" value={formData.religion} onChange={handleInputChange}>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Sikh</option>
                <option>Christian</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Nationality</label>
              <select className="form-select" name="nationality" value={formData.nationality} onChange={handleInputChange}>
                <option>Indian</option>
                <option>Non Indian</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Marital Status</label>
              <select className="form-select" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                <option>Married</option>
                <option>Single</option>
                <option>Divorced</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Hobbies</label>
              <input type="text" name="hobbies" value={formData.hobbies} onChange={handleInputChange} placeholder="Reading Books, Watching Movies" className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Languages Known</label>
              <input type="text" name="languagesKnown" value={formData.languagesKnown} onChange={handleInputChange} placeholder="Hindi,English" className="form-control" />
            </div>

            <div className="col-12">
              <label className="form-label">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-control" placeholder="Enter your Address here..." />
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              <h5 className="text-secondary"><i className="bi bi-briefcase"></i> Experience</h5>
              <div>
                <button type="button" onClick={handleAddExperience} className="text-decoration-none"><i className="bi bi-file-earmark-plus"></i> Add New</button>
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {formData.experiences.map((exp, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                  <div className="exp p-2 border rounded">
                    <div className="d-flex justify-content-between">
                      <h6>{exp.title || exp.company || 'Company Name'}</h6> {/* Hiển thị title hoặc company */}
                      <button type="button" onClick={() => handleRemoveExperience(index)} className="btn btn-link p-0">
                        <i className="bi bi-x-lg small"></i>
                      </button>
                    </div>
                    <input type="text" className="form-control mt-1" name="title" value={exp.title} onChange={(e) => handleExperienceChange(e, index)} placeholder="Company Name" />
                    <input type="text" className="form-control mt-1" name="company" value={exp.company} onChange={(e) => handleExperienceChange(e, index)} placeholder="Location" />
                    <div className="d-flex justify-content-between mt-1">
                      <input type="text" className="form-control me-1" name="start" value={exp.start} onChange={(e) => handleExperienceChange(e, index)} placeholder="Start Date" />
                      <input type="text" className="form-control" name="end" value={exp.end} onChange={(e) => handleExperienceChange(e, index)} placeholder="End Date" />
                    </div>
                    <textarea className="form-control mt-1" name="description" value={exp.description} onChange={(e) => handleExperienceChange(e, index)} rows="3" placeholder="Job Description"></textarea>
                  </div>
                </div>
              ))}
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              <h5 className="text-secondary"><i className="bi bi-book"></i> Education</h5>
              <div>
                <button type="button" onClick={handleAddEducation} className="text-decoration-none"><i className="bi bi-file-earmark-plus"></i> Add New</button>
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {formData.education.map((edu, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                  <div className="exp p-2 border rounded">
                    <div className="d-flex justify-content-between">
                      <h6>{edu.degree || edu.institution || 'Your School'}</h6> {/* Hiển thị degree hoặc institution */}
                      <button type="button" onClick={() => handleRemoveEducation(index)} className="btn btn-link p-0">
                        <i className="bi bi-x-lg small"></i>
                      </button>
                    </div>
                    <input type="text" className="form-control mt-1" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(e, index)} placeholder="Your School" />
                    <input type="text" className="form-control mt-1" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(e, index)} placeholder="Location" />
                    <input type="text" className="form-control mt-1" name="year" value={edu.year} onChange={(e) => handleEducationChange(e, index)} placeholder="Year of Passing" />
                  </div>
                </div>
              ))}
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              <h5 className="text-secondary"><i className="bi bi-star"></i> Skills</h5>
              <div>
                <button type="button" onClick={handleAddSkill} className="text-decoration-none"><i className="bi bi-file-earmark-plus"></i> Add New</button>
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {formData.skills.map((skill, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                  <div className="exp p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6><i className="bi bi-caret-right"></i> {skill || 'Your Skill'}</h6>
                      <button type="button" onClick={() => handleRemoveSkill(index)} className="btn btn-link p-0">
                        <i className="bi bi-x-lg small"></i>
                      </button>
                    </div>
                    <input type="text" className="form-control mt-1" value={skill} onChange={(e) => handleSkillChange(e, index)} placeholder="Skill" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
                <button type="submit" className="button2 type2">Save Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyResumes;

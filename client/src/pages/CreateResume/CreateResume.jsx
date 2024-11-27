import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CreateResume.css';
import axios from 'axios'
import { UserContext } from 'LoginContext/UserContext';


const CreateResume = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const {state} = useContext(UserContext)
  // console.log(state)
  const [user, setUser] = useState()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    dob: '',
    gender: 'Male',
    religion: 'Hindu',
    country: 'Indian',
    maritalStatus: 'Single',
    hobbies: '',
    languagesKnown: '',
    address: '',
    experiences: [{ title: "", company: "", startDate: "", endDate: "",description:"" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [{ name: "", level: "" }],
    socialLink: [{ Platform: "", URL: "" }],
    avatar: null,
  });

  useEffect(() => {
    if (!state.userId) {
      console.error('User ID is missing in the context state!');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile/getProfile', {
          params: { id: state.userId },
        });

        if (response.data ) {
          
          console.log("Return Data :",response.data)
          setFormData({
            fullName: response.data.fullname || '',
            email: response.data.email || '',
            address: response.data.address || '',
            dob: response.data.dob || '',
            country: response.data.country || '',
            mobileNo: response.data.phoneNumber || '',
            gender: response.data.sex || '',
            experiences: response.data.workExperience || [{ title: "", company: "", startDate: "", endDate: "" }],
            education: response.data.education || [{ degree: "", institution: "", year: "" }],
            skills: response.data.skills || [{ name: "", level: 0 }],
            socialLink: response.data.socialLink || [{ platform: '', url: '' }],
            avatar: response.data.avatar || null,
          });
        } else {
          console.log('Profile not found for user ID:', state.userId);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchProfile();
  }, [state.userId]);


  console.log(user)
  console.log(formData)

  

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
      experiences: [...formData.experiences, { title: '', company: '',location:' ' ,start: '', end: '', description: '' }],
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '' }],
    });
  };

  const handleAddSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { name: "", level: 0 }],
    }));
  };

const handleAddSocialLink = () => {
  setFormData(prevData => ({
    ...prevData,
    socialLink: [...prevData.socialLink, { Platform: "", URL: "" }]
  }));
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

  const handleSkillChange = (e, index, field) => {
    const { value } = e.target;
    
    // Update skill value, ensuring that skill.level is a number.
    if (field === 'level') {
      setFormData((prevData) => {
        const updatedSkills = [...prevData.skills];
        updatedSkills[index] = { ...updatedSkills[index], level: Number(value) }; // Ensuring it's a number
        return { ...prevData, skills: updatedSkills };
      });
    } else {
      setFormData((prevData) => {
        const updatedSkills = [...prevData.skills];
        updatedSkills[index] = { ...updatedSkills[index], [field]: value }; // Updating other fields
        return { ...prevData, skills: updatedSkills };
      });
    }
  };
  const handleSocialLinkChange = (e, index, field) => {
    const value = e.target.value;
    setFormData(prevData => {
      const updatedLinks = [...prevData.socialLink];
      updatedLinks[index][field] = value;
      return { ...prevData, socialLink: updatedLinks };
    });
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

  // Remove a skill
  const handleRemoveSkill = (index) => {
    setFormData((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills.splice(index, 1);
      return { ...prevData, skills: updatedSkills };
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const payload = {
    
    userId: state.userId, // Ensure userId is included
    ...formData,
    phone: formData.mobileNo, // Match server's expected field names
    socialLinks: formData.socialLink, // Correct the key name
  };
  
  try {
    const response = await axios.post('http://localhost:3001/profile/updateProfile', payload);
    if (response.status === 200) {
      alert('Profile saved successfully!');
      console.log(response.data);
    } else {
      alert('There was an issue saving your profile.');
    }
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('Error submitting the form. Please try again later.');
  }
};


const handleRemoveSocialLink = (index) => {
  setFormData((prevData) => ({
    ...prevData,
    socialLink: prevData.socialLink.filter((_, i) => i !== index), // Fix the typo
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

  const handleCreateCV = () => {
    const currentLink = location.pathname; // Get the current link
    navigate(`${currentLink}/${state.userId}`); // Append userID to the current link
  };

  const formattedDob = formData.dob ? formData.dob.split('T')[0] : '';

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
              <input type="text" name="fullName" value={formData.fullName } onChange={handleInputChange} placeholder="Dev Ninja" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="dev@abc.com" className="form-control" readOnly />
            </div>
            <div className="col-md-6">
              <label className="form-label">Mobile No</label>
              <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} placeholder="" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date Of Birth</label>
              <input
                type="date"
                name="dob"
                value={formattedDob} // Use formatted date here
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Religion</label>
              <select className="form-select" name="religion" value={formData.religion} onChange={handleInputChange}>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Sikh</option>
                <option>Christian</option>
                <option>Buddhism</option>
                <option>None</option>
              </select>
            </div>

            <div className="form col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Vietnam"
                  className="form-control"
                />
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
                      <input type="date" className="form-control me-1" name="start" value={exp.startDate} onChange={(e) => handleExperienceChange(e, index)} placeholder="Start Date" />
                      <input type="date" className="form-control" name="end" value={exp.end} onChange={(e) => handleExperienceChange(e, index)} placeholder="End Date" />
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
                <button type="button" onClick={handleAddSkill} className="text-decoration-none">
                  <i className="bi bi-file-earmark-plus"></i> Add New
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {formData.skills && formData.skills.map((skill, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                  <div className="exp p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>
                        <i className="bi bi-caret-right"></i> {skill.name || 'Your Skill'}
                      </h6>
                      <button type="button" onClick={() => handleRemoveSkill(index)} className="btn btn-link p-0">
                        <i className="bi bi-x-lg small"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control mt-1"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(e, index, 'name')}
                      placeholder="Skill"
                    />
                    <div className="d-flex align-items-center mt-2">
                      <label htmlFor={`skill-slider-${index}`} className="me-2">Proficiency:</label>
                      <input
                        type="range"
                        id={`skill-slider-${index}`}
                        className="form-range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(e, index, 'level')}
                      />
                      <span className="ms-2">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              <h5 className="text-secondary"><i className="bi bi-star"></i> Social Links</h5>
              <div>
                <button type="button" onClick={handleAddSocialLink} className="text-decoration-none"><i className="bi bi-file-earmark-plus"></i> Add New</button>
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {formData.socialLink && formData.socialLink.length > 0 && formData.socialLink.map((socialLink, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                  <div className="exp p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6><i className="bi bi-caret-right"></i> {socialLink.Platform || 'Your Link'}</h6>
                      <button type="button" onClick={() => handleRemoveSocialLink(index)} className="btn btn-link p-0">
                        <i className="bi bi-x-lg small"></i>
                      </button>
                    </div>
                    <input 
                      type="text" 
                      className="form-control mt-1" 
                      value={socialLink.Platform} 
                      onChange={(e) => handleSocialLinkChange(e, index,'Platform')} 
                      placeholder="Platform" 
                    />
                    <input 
                      type="text" 
                      className="form-control mt-1" 
                      value={socialLink.URL} 
                      onChange={(e) => handleSocialLinkChange(e, index,'URL')} 
                      placeholder="URL" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
                <button type="submit" onClick={handleSubmit} className="button type2">Save Profile</button>
            </div>
          </form>
          <button onClick={handleCreateCV}>Create CV</button>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;

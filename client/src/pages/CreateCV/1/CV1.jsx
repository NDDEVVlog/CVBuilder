import React, { useEffect, useState } from 'react';
import './CV1.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CV1 = () => {
  const { id } = useParams();

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
    experiences: [{ jobTitle: "", company: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [{ name: "", level: "" }],
    socialLink: [{ platform: "", url: "" }],
    avatar: null,
  });

  useEffect(() => {
    if (!id) {
      console.error('User ID is missing!');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile/getProfile', {
          params: { id: id },
        });

        if (response.data) {
          setFormData({
            fullName: response.data.fullname || '',
            email: response.data.email || '',
            address: response.data.address || '',
            dob: response.data.dob || '',
            country: response.data.country || '',
            mobileNo: response.data.phoneNumber || '',
            sex: response.data.sex || '',
            experiences: response.data.workExperience || [{ jobTitle: "", company: "", startDate: "", endDate: "", description: "" }],
            education: response.data.education || [{ degree: "", institution: "", year: "" }],
            skills: response.data.skills || [{ name: "", level: "" }],
            socialLink: response.data.socialLinks || [{ platform: '', url: '' }],
            avatar: response.data.avatar || null,
          });
        } else {
          console.log('Profile not found for user ID:', id);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchProfile();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Not Provided"; // Handle empty or undefined dates
    const d = new Date(date); // Convert to Date object
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Format as dd-mm-yyyy
  };

  const getSkillLevelClass = (level) => {
    switch (level) {
      case "Expert":
        return "expert";
      case "Advanced":
        return "advanced";
      case "Intermediate":
        return "intermediate";
      default:
        return "beginner";
    }
  };

  return (
    <div className="CV1Container">
      {/* Header Section */}
      <header className="cv-header">
        {formData.avatar && (
          <img
            src={URL.createObjectURL(formData.avatar)}
            alt="Profile"
            className="cv-avatar"
          />
        )}
        <h1 className="cv-fullname">{formData.fullName || "Full Name"}</h1>
        <p className="cv-email">{formData.email || "Email"}</p>
        <p className="cv-phone">{formData.mobileNo || "Phone Number"}</p>
      </header>

      {/* Personal Details Section */}
      <section className="cv-section personal-details">
        <h2>Personal Details</h2>
        <div className="personal-details-grid">
          <div>
            <p><strong>Date of Birth:</strong> {formatDate(formData.dob)}</p>
            <p><strong>Sex:</strong> {formData.sex || "Not Provided"}</p>
            <p><strong>Religion:</strong> {formData.religion || "Not Provided"}</p>
          </div>
          <div>
            <p><strong>Country:</strong> {formData.country || "Not Provided"}</p>
            <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
            <p><strong>Languages Known:</strong> {formData.languagesKnown || "Not Provided"}</p>
            <p><strong>Hobbies:</strong> {formData.hobbies || "Not Provided"}</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="cv-section experience-section">
        <h2>Experience</h2>
        {formData.experiences.map((experience, index) => (
          <div className="cv-box" key={index}>
            <h3>{experience.jobTitle || "Job Title"} at {experience.company || "Company Name"}</h3>
            <p>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</p>
            <p>{experience.description || "Job Description"}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="cv-section education-section">
        <h2>Education</h2>
        {formData.education.map((edu, index) => (
          <div className="cv-box" key={index}>
            <h3>{edu.degree || "Degree"}</h3>
            <p>{edu.institution || "Institution"} | {edu.year || "Year"}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="cv-section skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-name">{skill.name || "Skill Name"}</div>
              <div className="skill-bar">
                <div
                  className={`skill-level ${getSkillLevelClass(skill.level)}`}
                  style={{
                    width:
                      skill.level === "Expert"
                        ? "100%"
                        : skill.level === "Advanced"
                        ? "75%"
                        : skill.level === "Intermediate"
                        ? "50%"
                        : "25%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links Section */}
      <section className="cv-section social-links-section">
        <h2>Social Links</h2>
        <ul>
          {formData.socialLink.map((link, index) => (
            <li key={index}>
              <strong>{link.platform || "Platform"}:</strong> {link.url || "URL"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CV1;

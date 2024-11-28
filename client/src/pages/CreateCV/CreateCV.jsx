import React, { useEffect, useState } from 'react';
import './CreateCV.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateCV = () => {
  const { id } = useParams();

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
    experiences: [{ title: "", company: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [{ name: "", level: "" }],
    socialLink: [{ Platform: "", URL: "" }],
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
            gender: response.data.sex || '',
            experiences: response.data.workExperience || [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
            education: response.data.education || [{ degree: '', institution: '', year: '' }],
            skills: response.data.skills || [{ name: '', level: 0 }],
            socialLink: response.data.socialLink || [{ platform: '', url: '' }],
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

  return (
    <div className="CreateCVContainer">
      {/* Header Section */}
      <header className="cv-header">
        {formData.avatar && <img src={formData.avatar} alt="Profile Avatar" className="cv-avatar" />}
        <h1 className="cv-fullname">{formData.fullName}</h1>
        <p className="cv-contact">
          {formData.email} | {formData.mobileNo}
        </p>
        <p className="cv-address">{formData.address}</p>
      </header>

      {/* Skills Section */}
      <section className="cv-section">
        <h2>Skills</h2>
        <ul className="cv-skills">
          {formData.skills.length > 0 ? (
            formData.skills.map((skill, index) => (
              <li key={index}>
                {skill.name} - Level: {skill.level}
              </li>
            ))
          ) : (
            <li>No skills added yet.</li>
          )}
        </ul>
      </section>

      {/* Experience Section */}
      <section className="cv-section">
        <h2>Experience</h2>
        {formData.experiences.length > 0 ? (
          formData.experiences.map((job, index) => (
            <div key={index} className="cv-experience-item">
              <h3>{job.title} at {job.company}</h3>
              <p>{job.startDate} - {job.endDate}</p>
              <p>{job.description}</p>
            </div>
          ))
        ) : (
          <p>No experience added yet.</p>
        )}
      </section>

      {/* Education Section */}
      <section className="cv-section">
        <h2>Education</h2>
        {formData.education.length > 0 ? (
          formData.education.map((edu, index) => (
            <div key={index} className="cv-education-item">
              <h3>{edu.degree}</h3>
              <p>{edu.institution} - {edu.year}</p>
            </div>
          ))
        ) : (
          <p>No education added yet.</p>
        )}
      </section>

      {/* Social Links Section */}
      <section className="cv-section">
        <h2>Social Links</h2>
        <ul className="cv-social-links">
          {formData.socialLink.length > 0 ? (
            formData.socialLink.map((link, index) => (
              <li key={index}>
                <a href={link.URL} target="_blank" rel="noopener noreferrer">{link.Platform}</a>
              </li>
            ))
          ) : (
            <li>No social links added yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default CreateCV;

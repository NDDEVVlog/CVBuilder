import React, { useEffect, useState, useRef } from 'react';
import './CV2.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CV2 = () => {
  const { id } = useParams();
  const cvRef = useRef(null);

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
    experiences: [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', year: '' }],
    skills: [{ name: '', level: 'Beginner' }],
    socialLink: [{ platform: '', url: '' }],
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
          params: { id },
        });

        if (response.data) {
          const {
            fullname,
            email,
            address,
            dob,
            nationality,
            phoneNumber,
            religion,
            maritalStatus,
            languagesKnown,
            sex,
            hobbies,
            workExperience,
            education,
            skills,
            socialLinks,
            avatar,
          } = response.data;

          setFormData({
            fullName: fullname || '',
            email: email || '',
            address: address || '',
            dob: dob || '',
            country: nationality || '',
            mobileNo: phoneNumber || '',
            religion: religion || 'None',
            maritalStatus: maritalStatus || 'Single',
            languagesKnown: languagesKnown || '',
            sex: sex || '',
            hobbies: hobbies || '',
            experiences: workExperience || [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
            education: education || [{ degree: '', institution: '', year: '' }],
            skills: skills || [{ name: '', level: 'Beginner' }],
            socialLink: socialLinks || [{ platform: '', url: '' }],
            avatar: avatar || null,
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
    if (!date) return 'Not Provided';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getSkillLevelClass = (level) => {
      if (level >= 100) {
        return 'expert';  // add class for high level skills
      } else if (level >= 75) {
        return 'advanced';  // add class for medium level skills
      } else if (level >= 50){
        return 'intermediate'
      } 
      else {
        return 'beginner';  // add class for low level skills
      }
  };

  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 10,
      filename: `${formData.fullName || 'CV'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <button onClick={downloadPDF} className="download-btn">
        Download as PDF
      </button>
      <div ref={cvRef} className="CV2Container">
        {/* Left Column */}
        <div className="cv-left-column">
          <header className="cv-header">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile" className="cv-avatar" />
            ) : (
              <div className="cv-avatar-placeholder">Avatar</div>
            )}
            <h1 className="cv-fullname">{formData.fullName || 'Full Name'}</h1>
            <p className="cv-email">{formData.email || 'Email'}</p>
            <p className="cv-phone">{formData.mobileNo || 'Phone Number'}</p>
          </header>
          <section className="cv-section personal-details">
            <h2>Personal Details</h2>
            <p><strong>Date of Birth:</strong> {formatDate(formData.dob)}</p>
            <p><strong>Sex:</strong> {formData.sex || 'Not Provided'}</p>
            <p><strong>Religion:</strong> {formData.religion || 'Not Provided'}</p>
            <p><strong>Country:</strong> {formData.country || 'Not Provided'}</p>
            <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
          </section>
          <section className="cv-section social-links-section">
            <h2>Social Links</h2>
            <ul>
              {formData.socialLink.map((link, index) => (
                <li key={index}><strong>{link.platform}:</strong> <a href={link.url}>{link.url}</a></li>
              ))}
            </ul>
          </section>
        </div>
        {/* Right Column */}
        <div className="cv-right-column">
          <section className="cv-section experience-section">
            <h2>Experience</h2>
            {formData.experiences.map((experience, index) => (
              <div key={index} className="cv-box">
                <h3>{experience.jobTitle} at {experience.company}</h3>
                <p>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</p>
                <p>{experience.description}</p>
              </div>
            ))}
          </section>
          <section className="cv-section education-section">
            <h2>Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="cv-box">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} | {edu.year}</p>
              </div>
            ))}
          </section>
          <section className="cv-section skills-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              {formData.skills.map((skill, index) => (
                <div key={index} className={`skill-item ${getSkillLevelClass(skill.level)}`}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CV2;

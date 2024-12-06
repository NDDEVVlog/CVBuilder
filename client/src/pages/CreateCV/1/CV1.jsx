import React, { useEffect, useState, useRef } from 'react';
import './CV1.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CV1 = () => {
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
    skills: [{ name: '', level: 0 }], // Skill level is now a number
    socialLink: [{ platform: '', url: '' }],
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
            skills: skills || [{ name: '', level: 0 }],
            socialLink: socialLinks || [{ platform: '', url: '' }],
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
    <div className="CV1Container" ref={cvRef}>
      {/* Header Section */}
      <header className="cv-header">
        <h1>{formData.fullName || "Full Name"}</h1>
        <p>{formData.email || "Email"}</p>
        <p>{formData.mobileNo || "Phone Number"}</p>
      </header>

      {/* Personal Details Section */}
      <section className="cv-section personal-details">
        <h2>Personal Details</h2>
        <div>
          <p><strong>Date of Birth:</strong> {formatDate(formData.dob)}</p>
          <p><strong>Sex:</strong> {formData.sex || "Not Provided"}</p>
          <p><strong>Religion:</strong> {formData.religion || "Not Provided"}</p>
          <p><strong>Country:</strong> {formData.country || "Not Provided"}</p>
          <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
          <p><strong>Languages Known:</strong> {formData.languagesKnown || "Not Provided"}</p>
          <p><strong>Hobbies:</strong> {formData.hobbies || "Not Provided"}</p>
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
        {formData.skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-name">{skill.name || "Skill Name"}</div>
            <div className="skill-level">{skill.level || 0}</div> {/* Just show the number */}
          </div>
        ))}
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

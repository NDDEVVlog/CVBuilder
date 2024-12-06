import React, { useEffect, useState,useRef } from 'react';
import './CreateCV.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CreateCV = () => {
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
    if (level >= 75) {
      return 'expert'; // High-level skill
    } else if (level >= 50) {
      return 'advanced'; // Medium-level skill
    } else if (level >= 25) {
      return 'intermediate'; // Basic skill
    } else {
      return 'beginner'; // Very basic skill
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
    <div className="CreateCVContainer" ref={cvRef}>
      {/* Header Section */}
      <header className="cv-header">
        {formData.avatar && (
          <img
            src={URL.createObjectURL(formData.avatar)}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        )}
        <h1>{formData.fullName || "Full Name"}</h1>
        <p>{formData.email || "Email"}</p>
        <p>{formData.mobileNo || "Phone Number"}</p>
        <p>{formData.address || "Address"}</p>
      </header>

      {/* Personal Details */}
      <section id="personal-details-section" className="cv-section personal-details">
      <h2>Personal Details</h2>
    <div className="personal-details-grid">
      <div>
        <p>
          <strong>Date of Birth:</strong> <span>{formatDate(formData.dob)}</span>
        </p>
        <p>
          <strong>Sex:</strong> <span>{formData.sex || "Not Provided"}</span>
        </p>
        <p>
          <strong>Religion:</strong> <span>{formData.religion || "Not Provided"}</span>
        </p>
      </div>
      <div>
        <p>
          <strong>Country:</strong> <span>{formData.country || "Not Provided"}</span>
        </p>
        <p>
          <strong>Marital Status:</strong> <span>{formData.maritalStatus}</span>
        </p>
        <p>
          <strong>Languages Known:</strong> <span>{formData.languagesKnown || "Not Provided"}</span>
        </p>
        <p>
          <strong>Hobbies:</strong> <span>{formData.hobbies || "Not Provided"}</span>
        </p>
      </div>
    </div>
  </section>


      {/* Experience Section */}
      <section id="experience-section" className="cv-section">
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
      <section id="education-section" className="cv-section">
        <h2>Education</h2>
        {formData.education.map((edu, index) => (
          <div className="cv-box" key={index}>
            <h3>{edu.degree || "Degree"}</h3>
            <p>{edu.institution || "Institution"} | {edu.year || "Year"}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="cv-section skills-section">
      <h2>Skills</h2>
        <div className="skills-grid">
        {formData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-name">{skill.name || "Skill Name"}</div>
              <div className="skill-bar">
                <div
                  className={`skill-level ${getSkillLevelClass(skill.level)}`}
                  style={{
                    width: `${Math.min(skill.level, 100)}%`, // Cap at 100%
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links Section */}
      <section className="cv-section">
        <h2>Social Links</h2>
        <ul>
          {formData.socialLink.map((link, index) => (
            <li key={index}>
              <strong>{link.platform || "Platform"}:</strong>{" "}
              <span>{link.url || "URL"}</span>
              {/* Alternatively, make the URL a clickable link: */}
              {/* <a href={link.url || "#"} target="_blank" rel="noopener noreferrer">
                {link.url || "URL"}
              </a> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
    </div>
  );
};

export default CreateCV;

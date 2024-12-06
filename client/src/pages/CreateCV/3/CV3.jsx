import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CV3 = () => {
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
    skills: [{ name: '', level: 0 }],
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
    <div style={{
      display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    }}>
      <button
        onClick={downloadPDF}
        style={{
          margin: '20px auto',
          padding: '10px 20px',
          background: 'linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        Download as PDF
      </button>
      <div
        ref={cvRef}
        style={{
          margin: '20px auto',
          padding: '20px',
          width: '49.625rem', // A4 width
          height: '1122px', // A4 height
          background: 'linear-gradient(120deg, #000428, #004e92)',
          borderRadius: '15px',
          color: '#fff',
          fontFamily: "'Orbitron', sans-serif",
          overflow: 'hidden',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h1 style={{ color: '#00e0ff', margin: 0, fontSize: '24px' }}>{formData.fullName}</h1>
          <p style={{ fontSize: '12px' }}>{formData.email} | {formData.mobileNo}</p>
          <p style={{ fontSize: '12px' }}>{formData.address}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', rowGap: '10px', fontSize: '12px' }}>
          <div style={{ border: '1px solid #00e0ff', padding: '10px', borderRadius: '5px' }}>
            <h2 style={{ borderBottom: '1px solid #00e0ff', marginBottom: '5px' }}>Work Experience</h2>
            {formData.experiences.map((exp, index) => (
              <div key={index}>
                <h3>{exp.jobTitle} at {exp.company}</h3>
                <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid #c471ed', padding: '10px', borderRadius: '5px' }}>
            <h2 style={{ borderBottom: '1px solid #c471ed', marginBottom: '5px' }}>Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p>{edu.year}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ border: '1px solid #f64f59', padding: '10px', borderRadius: '5px' }}>
              <h2 style={{ borderBottom: '1px solid #f64f59', marginBottom: '5px' }}>Skills</h2>
              <ul style={{ paddingLeft: '20px' }}>
                {formData.skills.map((skill, index) => (
                  <li key={index}>
                    <span>{skill.name} - Level: {skill.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ border: '1px solid #12c2e9', padding: '10px', borderRadius: '5px' }}>
              <h2 style={{ borderBottom: '1px solid #12c2e9', marginBottom: '5px' }}>Social Links</h2>
              <ul style={{ paddingLeft: '20px' }}>
                {formData.socialLink.map((link, index) => (
                  <li key={index}>
                    {link.platform}: <a href={link.url}>{link.url}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV3;

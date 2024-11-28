import React, { useEffect, useState } from 'react';
import './CreateCV.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CV1 = () => {
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

//   return (
   
//   );
};

export default CV1;

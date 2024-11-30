import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CV3 = () => {
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
    experiences: [{ jobTitle: "", company: "", startDate: "", endDate: "",description:"" }],
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
            experiences: response.data.workExperience || [{ jobTitle: "", company: "", startDate: "", endDate: "",description:"" }],
            education: response.data.education || [{ degree: "", institution: "", year: "" }],
            skills: response.data.skills || [{ name: "", level: 0 }],
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

//   return (
   
//   );
};

export default CV3;

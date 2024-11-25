import Profile from '../models/Profile.js';

// Create a new profile
export const create = async (req, res) => {
    try {
        const { userId, fullName, email, address, dob, phone, sex, skills = [], education = [], workExperience = [], socialLinks = [] } = req.body;

        console.log('Incoming profile data:', req.body);

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const existingProfile = await Profile.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists for this user' });
        }

        const newProfile = new Profile({
            user: userId,
            fullname: fullName,
            email,
            address,
            dob,
            phoneNumber: phone,
            sex,
            skills,
            education,
            workExperience,
            socialLinks,
        });

        const savedProfile = await newProfile.save();
        console.log('Profile saved:', savedProfile);

        res.status(201).json({ message: 'Profile saved successfully', profile: savedProfile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Failed to save profile', error: error.message });
    }
};

export const getProfile = async (req, res) => {
  const { id } = req.query; // Get the userId from the query parameter

  if (!id) {
    return res.status(400).send({ message: 'User ID is required' });
  }

  try {
    // Find the profile by user ID
    const profile = await Profile.findOne({ user: id }).populate('user', 'fullName email'); // You can populate user fields if needed

    if (!profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }
    console.log(profile)
    return res.status(200).json(profile); // Return the profile data if found
  } catch (err) {
    console.error('Error fetching profile:', err);
    return res.status(500).send({ message: 'Error fetching profile' });
  }
};

// Update an existing profile
export const updateProfile = async (req, res) => {
    try {
        const { userId, fullName, email, address, dob, phone, sex, skills, education, workExperience, socialLinks } = req.body;

        console.log('Incoming update data:', req.body);

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the profile by user ID
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        // Update fields if they are provided in the request body
        if (fullName) profile.fullname = fullName;
        if (email) profile.email = email;
        if (address) profile.address = address;
        if (dob) profile.dob = dob;
        if (phone) profile.phoneNumber = phone;
        if (sex) profile.sex = sex;
        if (skills) profile.skills = skills;
        if (education) profile.education = education;
        if (workExperience) profile.workExperience = workExperience;
        if (socialLinks) profile.socialLinks = socialLinks;

        // Save the updated profile
        const updatedProfile = await profile.save();

        console.log('Profile updated:', updatedProfile);
        return res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};
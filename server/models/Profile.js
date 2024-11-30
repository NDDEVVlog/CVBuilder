import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// Education schema
const educationSchema = new mongoose.Schema({
    institution: {
        type: String, // Name of the institution (e.g., university, school)

    },
    degree: {
        type: String, // Degree obtained (e.g., Bachelor's, Master's)

    },
    year: {
        type: String // Date when the education started
    },
    
});

// Work experience schema
const workExperienceSchema = new mongoose.Schema({
    jobTitle: {
        type: String,

    },
    company: {
        type: String,

    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date // Can be null if the job is ongoing
    },
    description: {
        type: String // Description of job responsibilities
    }
});

// Social links schema
const socialLinksSchema = new mongoose.Schema({
    platform: {
        type: String, // e.g., LinkedIn, GitHub, Twitter

    },
    url: {
        type: String, // Link to the social profile

    }
});
const skillSchema = new mongoose.Schema({
    name: {
        type: String,
     
        trim: true,     // Removes whitespace from the beginning and end
    },
    level: {
        type: Number,

        min: 0,         // Minimum value for the level field
        max: 100        // Maximum value for the level field
    }
});

// Main user profile schema
const profileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        alias: 'fullName' // Allows using `fullName` in the request
    },
    dob:{
        type:Date,
        required: true,
        trim: true
    },
    religion:{
        type: String,
        trim: true
    },
    nationality:{
        type: String,


        trim: true
    },
    phoneNumber: {
        type: String,

        trim: true
    },
    maritalStatus: {
        type: String,
        trim: true
    },
    email: {
        type: String, // Email address of the user
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
    },
    sex:{
        type:String,
        required:true,
    },
    languagesKnown: {
        type:String,
    },
    skills: [skillSchema],
    education: [educationSchema], // Embedding education schema
    workExperience: [workExperienceSchema], // Embedding work experience schema
    socialLinks: [socialLinksSchema], // Embedding social links schema
}, { timestamps: true });



// Xuất model User
const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

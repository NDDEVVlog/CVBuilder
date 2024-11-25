import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// Education schema
const educationSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true // You can decide if this should be required or optional
    },
    shortDescription: {
        type: String
    },  
    institution: {
        type: String, // Name of the institution (e.g., university, school)
        required: true
    },
    degree: {
        type: String, // Degree obtained (e.g., Bachelor's, Master's)
        required: true
    },
    fieldOfStudy: {
        type: String // Area of study (e.g., Computer Science)
    },
    startDate: {
        type: Date // Date when the education started
    },
    endDate: {
        type: Date // Date when the education ended (can be null if ongoing)
    }
});

// Work experience schema
const workExperienceSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String // Location of the company
    },
    startDate: {
        type: Date,
        required: true
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
        required: true
    },
    url: {
        type: String, // Link to the social profile
        required: true
    }
});
const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensures the name field is mandatory
        trim: true,     // Removes whitespace from the beginning and end
    },
    level: {
        type: Number,
        required: true, // Ensures the level field is mandatory
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
        trim: true
    },
    dob:{
        type:Date,
        required: true,
        trim: true
    },
    religion:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
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
    skills: [skillSchema],
    education: [educationSchema], // Embedding education schema
    workExperience: [workExperienceSchema], // Embedding work experience schema
    socialLinks: [socialLinksSchema], // Embedding social links schema
}, { timestamps: true });



// Xuất model User
const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

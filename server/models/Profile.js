import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const educationSchema = new mongoose.Schema({
    status :{
        type:String 
    },
    shortDescription: {
        type: String
    }
})

// Tạo schema cho user
const profileSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastName: {
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
    education: [educationSchema],
    


}, { timestamps: true });

// Mã hóa mật khẩu trước khi lưu user vào database
userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password') || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (err) {
        next(err);
    }
});


// So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Xuất model User
const User = mongoose.model('User', userSchema);
export default User;

import User from '../models/User.js';
import bcrypt from 'bcrypt'


// [GET] Get user's id
export const getUser = async (req,res) => {
    const {id} = req.query
    const user = await User.findById(id)

    if(!user) {
        return res.status(404).json({message: 'User not found!'})
    }

    return res.status(200).json(user)
}

// Hàm đăng ký người dùng
export const registerUser = async (req, res) => {   
    console.log(req.body);
    const { password, firstName, lastName,email } = req.body;

    // Kiểm tra nếu username, password, firstName hoặc lastName không có trong yêu cầu
    if ( !password || !firstName || !lastName ||!email) {
        return res.status(400).json({ message: 'Username, Password, First Name và Last Name là bắt buộc.' });
    }

    try {
        // Kiểm tra xem username đã tồn tại hay chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Username đã tồn tại.' });
        }

        // Tạo một user mới
        const newUser = new User({
            password,
            firstName,  
            lastName,
            email
        });
        
        // Lưu user vào MongoDB
        await newUser.save();

        // Phản hồi về thành công
        res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log(password)

    // Kiểm tra nếu username hoặc password không có trong yêu cầu
    if (!username || !password) {
        return res.status(400).json({ message: 'Username và Password là bắt buộc.' });
    }

    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ email: username });
        if (!user) {
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ' });
        }

        // Nếu đăng nhập thành công
        res.status(200).json(user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Lỗi server', error });
    }
};
import User from '../models/User.js';
import bcrypt from 'bcrypt'


// Hàm đăng ký người dùng
export const registerUser = async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    // Kiểm tra nếu username, password, firstName hoặc lastName không có trong yêu cầu
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'Username, Password, First Name và Last Name là bắt buộc.' });
    }

    try {
        // Kiểm tra xem username đã tồn tại hay chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username đã tồn tại.' });
        }

        // Tạo một user mới
        const newUser = new User({
            username,
            password,
            firstName,
            lastName
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
        const user = await User.findOne({ username });
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
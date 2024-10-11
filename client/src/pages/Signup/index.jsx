import React, { useState } from 'react';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [message, setMessage] = useState('');

    // Validate form data
    const validateForm = () => {
        if (password.length < 6) {
            setError('Mật khẩu phải dài ít nhất 6 ký tự.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu và Xác nhận mật khẩu không khớp.');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            setError('');
            setSuccess('Đăng ký thành công!');
            try {
                const response = await fetch('http://localhost:3001/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage('Registration successful!');
                } else {
                    setMessage(data.message || 'Registration failed!');
                }
            } catch (error) {
                setMessage('Error during registration. Please try again.');
            }
        }
    };

    return (
        <div style={{position: 'absolute', bottom: '300px', right: '600px'}}>
            <h2>Đăng Ký</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Xác nhận mật khẩu:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default SignUp;

import React, { useState } from 'react';
import './css/Login.css';
import Register from './Register';
import axios from 'axios';

const Notification = ({ message, type }) => {
    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

const Login = () => {
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        ma_NV: '',
        mat_Khau: ''
    });

    // Hàm xử lý thay đổi giá trị trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường dữ liệu
        if (!formData.ma_NV || !formData.mat_Khau) {
            setNotification({ message: "Mã nhân viên và mật khẩu là bắt buộc.", type: 'error' });
            return;
        }

        setIsLoading(true); // Bắt đầu loading khi gửi yêu cầu
        try {
            // Gửi yêu cầu đăng nhập đến API
            const response = await axios.post('http://localhost:8000/api/nhanvien/signin', formData);

            // Nếu đăng nhập thành công
            setNotification({ message: response.data.message, type: 'success' });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            // Nếu có lỗi từ API
            setNotification({ message: error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng nhập.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    // Hiển thị modal
    const handleAddClick = () => {
        setShowModal(true);
    };

    // Đóng modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Đảm bảo khi người dùng click vào vùng ngoài modal thì cũng đóng modal
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Đăng Nhập</h2>
                {notification.message && <Notification message={notification.message} type={notification.type} />}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ma_NV">Nhập Mã Nhân Viên</label>
                        <input
                            type="text"
                            id="ma_NV"
                            name="ma_NV"
                            placeholder="Nhập mã nhân viên"
                            value={formData.ma_NV}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mat_Khau">Mật khẩu</label>
                        <input
                            type="password"
                            id="mat_Khau"
                            name="mat_Khau"
                            value={formData.mat_Khau}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        {isLoading ? "Đang Đăng Nhập..." : "Đăng Nhập"}
                    </button>
                </form>
                <p className="login-footer">
                    Chưa có tài khoản? <span onClick={handleAddClick}>Đăng ký</span>
                </p>
            </div>

            {/* Hiển thị modal khi showModal là true */}
            {showModal && (
                <div className="modal" onClick={handleModalClick}>
                    <div className="modal-content">
                        {/* Nút đóng */}
                        <button className="close" onClick={closeModal}>
                            &times;
                        </button>
                        <Register />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

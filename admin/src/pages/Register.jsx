import React, { useState } from 'react';
import './css/Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [register, setRegister] = useState({
        ma_NV: '',
        ho_Ten: '',
        chuc_Vu: '',
        dia_Chi: '',
        so_Dien_Thoai: '',
        mat_Khau: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({
            ...register,
            [name]: value
        });
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường dữ liệu
        if (!register.ma_NV || !register.ho_Ten || !register.chuc_Vu || !register.dia_Chi || !register.so_Dien_Thoai || !register.mat_Khau) {
            setErrorMessage("Tất cả các trường đều cần thiết.");
            return;
        }

        try {
            // Gửi yêu cầu đăng ký đến API
            const response = await axios.post('http://localhost:8000/nhanvien/signup', {
                ma_NV: register.ma_NV,
                ho_Ten: register.ho_Ten,
                chuc_Vu: register.chuc_Vu,
                dia_Chi: register.dia_Chi,
                so_Dien_Thoai: register.so_Dien_Thoai,
                mat_Khau: register.mat_Khau
            });

            // Nếu đăng ký thành công
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setRegister({
                ma_NV: '',
                ho_Ten: '',
                chuc_Vu: '',
                dia_Chi: '',
                so_Dien_Thoai: '',
                mat_Khau: ''
            });
        } catch (error) {
            // Nếu có lỗi từ API
            setErrorMessage(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng ký.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2 className="register-title">Đăng Kí Tài Khoản</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ma_NV">Mã Nhân Viên</label>
                        <input type="text" id="ma_NV" name="ma_NV" placeholder="Nhập mã nhân viên" value={register.ma_NV} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ho_Ten">Họ Và Tên</label>
                        <input type="text" id="ho_Ten" name="ho_Ten" placeholder="Nhập họ và tên" value={register.ho_Ten} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chuc_Vu">Chức vụ</label>
                        <input type="text" id="chuc_Vu" name="chuc_Vu" placeholder="Nhập chức vụ" value={register.chuc_Vu} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dia_Chi">Địa chỉ</label>
                        <input type="text" id="dia_Chi" name="dia_Chi" placeholder="Nhập địa chỉ" value={register.dia_Chi} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="so_Dien_Thoai">Số điện thoại</label>
                        <input type="tel" id="so_Dien_Thoai" name="so_Dien_Thoai" placeholder="Nhập số điện thoại" value={register.so_Dien_Thoai} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mat_Khau">Mật khẩu</label>
                        <input type="password" id="mat_Khau" name="mat_Khau" placeholder="Mật khẩu" value={register.mat_Khau} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="register-button">Đăng Kí</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <p className="register-footer">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
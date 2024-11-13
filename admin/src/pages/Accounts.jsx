import React, { useState, useEffect } from 'react';
import './css/Accounts.css';

const Accounts = () => {
    const [accountData, setAccountData] = useState({
        ma_NV: "",
        fullName: "",
        position: "",
        phoneNumber: "",
        address: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy thông tin nhân viên đã đăng nhập từ API khi component được render
    useEffect(() => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('authToken');

        // Nếu không có token, không thể lấy thông tin nhân viên
        if (!token) {
            setError('Bạn chưa đăng nhập!');
            setLoading(false);
            return;
        }

        // Giả sử bạn có một API trả về thông tin người dùng đã đăng nhập
        fetch('http://localhost:8000/api/user-profile', { // Cập nhật đường dẫn API phù hợp
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Sử dụng token để xác thực
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setAccountData({
                        ma_NV: data.ma_NV,
                        fullName: data.fullName,
                        position: data.position,
                        phoneNumber: data.phoneNumber,
                        address: data.address
                    });
                    setLoading(false);
                } else {
                    setError('Không thể lấy thông tin người dùng.');
                    setLoading(false);
                }
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Đang tải thông tin...</div>;
    }

    if (error) {
        return <div>Đã xảy ra lỗi: {error}</div>;
    }

    return (
        <div className="account-container">
            <h2 className="account-title">Thông Tin</h2>
            <div className="account-details">
                <div className="account-item">
                    <strong>Mã Nhân Viên :</strong>
                    <span>{accountData.ma_NV}</span>
                </div>
                <div className="account-item">
                    <strong>Họ và Tên :</strong>
                    <span>{accountData.fullName}</span>
                </div>
                <div className="account-item">
                    <strong>Chức Vụ :</strong>
                    <span>{accountData.position}</span>
                </div>
                <div className="account-item">
                    <strong>Số điện thoại:</strong>
                    <span>{accountData.phoneNumber}</span>
                </div>
                <div className="account-item">
                    <strong>Địa chỉ :</strong>
                    <span>{accountData.address}</span>
                </div>
            </div>
            <button className="change-info-button">
                Thay đổi thông tin
            </button>
        </div>
    );
};

export default Accounts;

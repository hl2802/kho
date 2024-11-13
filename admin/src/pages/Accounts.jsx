import React, { useState } from 'react';
import './css/Accounts.css';

const Accounts = () => {
    const [accountData, setAccountData] = useState({
        ma_NV: "MS001",
        fullName: "Admin",
        position: "Software Engineer",
        phoneNumber: "(123) 456-7890",
        address: "123, HCM"
    });

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
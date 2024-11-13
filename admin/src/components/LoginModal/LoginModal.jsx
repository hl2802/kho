import React, { useState } from 'react';
import '../LoginModal/LoginModal.css';
import Login from '../../pages/Login';

const LoginModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleAddClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={handleAddClick} className="login-btn">
                <i className="fas fa-sign-in-alt"></i>
            </button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={closeModal}>&times;</button>
                        <Login />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginModal;
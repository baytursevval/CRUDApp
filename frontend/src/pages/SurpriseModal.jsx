import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SurpriseModal.css';

const SurpriseModal = () => {
    const navigate = useNavigate();

    const handleShow = () => {
        navigate('/surprise');
    };

    return (
        <div className="gift-icon" onClick={handleShow}>
            🎁
        </div>
    );
};

export default SurpriseModal;

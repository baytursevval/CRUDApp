// src/components/SurveyPage.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Confetti from 'react-confetti';
import './SurveyPage.css';

const SurveyPage = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [noButtonStyle, setNoButtonStyle] = useState({});

    const handleYesClick = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Konfeti 5 saniye sonra duracak
    };

    const handleNoHover = () => {
        const newLeft = Math.random() * 90;
        const newTop = Math.random() * 90;
        setNoButtonStyle({
            position: 'absolute',
            left: `${newLeft}%`,
            top: `${newTop}%`,
        });
    };

    return (
        <Container className="survey-container mt-5">
            <h1>Benimle çalışmaktan memnun kaldınız mı?</h1>
            <div className="button-group">
                <Button variant="success" onClick={handleYesClick}>Evet</Button>
                <Button
                    variant="danger"
                    onMouseEnter={handleNoHover}
                    style={noButtonStyle}
                >
                    Hayır
                </Button>
            </div>
            {showConfetti && <Confetti style={{ position: 'fixed', top: 110, left: 0, width: '100%', height: '100%' }} />}
        </Container>
    );
};

export default SurveyPage;

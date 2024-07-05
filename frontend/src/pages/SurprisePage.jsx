import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Confetti from 'react-confetti';
import './SurprisePage.css';
import BearImage from '../assets/bear.png';
import QuestionIcon from '../assets/q.png';

const SurprisePage = () => {
    const [notes, setNotes] = useState([
        { id: 1, text: "Sizinle çalışmak güzeldi." },
        { id: 2, text: "Bana katkılarınız için teşekkürler." }
    ]);

    const [selectedNotes, setSelectedNotes] = useState({});
    const [showQuestion, setShowQuestion] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleNoteClick = (noteId) => {
        setSelectedNotes((prev) => ({
            ...prev,
            [noteId]: !prev[noteId],
        }));
    };

    const handleQuestionClick = () => {
        setShowQuestion(true);
    };

    const handleYesClick = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Konfeti 5 saniye sonra duracak
    };

    return (
        <div className="surprise-container">
            {notes.map((note) => (
                <BearNote
                    key={note.id}
                    note={note}
                    isSelected={selectedNotes[note.id]}
                    onNoteClick={() => handleNoteClick(note.id)}
                />
            ))}
            <QuestionIconComponent onClick={handleQuestionClick} />
            {showQuestion && <QuestionModal handleYesClick={handleYesClick} />}
            {showConfetti && <Confetti style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />}
        </div>
    );
}

const BearNote = ({ note, isSelected, onNoteClick }) => {
    const noteAnimation = useSpring({
        opacity: isSelected ? 1 : 0,
        config: { duration: 1000 }
    });

    const bearAnimation = useSpring({
        from: { transform: 'rotate(0deg)' },
        to: async (next) => {
            while (1) {
                await next({ transform: 'rotate(-5deg)' });
                await next({ transform: 'rotate(5deg)' });
            }
        },
        config: { duration: 1000 }
    });

    return (
        <animated.div className="bear-container" style={bearAnimation}>
            <img src={BearImage} alt="bear" className="bear" />
            <div className="note" onClick={onNoteClick}>
                <animated.p style={noteAnimation}>{note.text}</animated.p>
            </div>
        </animated.div>
    );
};

const QuestionIconComponent = ({ onClick }) => {
    const questionAnimation = useSpring({
        from: { transform: 'translateY(0px)' },
        to: async (next) => {
            while (1) {
                await next({ transform: 'translateY(-10px)' });
                await next({ transform: 'translateY(10px)' });
            }
        },
        config: { duration: 1000 }
    });

    return (
        <animated.div className="question-icon" style={questionAnimation} onClick={onClick}>
            <img src={QuestionIcon} alt="question" />
        </animated.div>
    );
};

const QuestionModal = ({ handleYesClick }) => {
    const [noButtonStyle, setNoButtonStyle] = useState({});

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
        <div className="question-modal">
            <h1>Peki benimle çalışmak güzel miydi? :) </h1>
            <div className="button-group">
                <button className="yes-button" onClick={handleYesClick}>Evet</button>
                <button
                    className="no-button"
                    onMouseEnter={handleNoHover}
                    style={noButtonStyle}
                >
                    Hayır
                </button>
            </div>
        </div>
    );
};

export default SurprisePage;

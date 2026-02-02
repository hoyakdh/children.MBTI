import React from 'react';
import { questions } from '../data/questions';

const QuestionScreen = ({ questionIndex, onAnswer }) => {
    const currentQuestion = questions[questionIndex];
    const progress = ((questionIndex + 1) / questions.length) * 100;

    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#FFE5E5', // Soft Pink
            padding: '2rem'
        }}>
            <div style={{
                background: '#FFF0F0',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                {/* Progress Bar Container */}
                <div style={{
                    width: '100%',
                    height: '10px',
                    background: '#FFF',
                    borderRadius: '5px',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    border: '1px solid #FFC0CB'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#FF6B6B',
                        transition: 'width 0.5s ease',
                        borderRadius: '5px'
                    }}></div>
                </div>

                {/* Question Number */}
                <div style={{
                    color: '#FF6B6B',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontFamily: '"Gaegu", sans-serif'
                }}>
                    Q{questionIndex + 1}.
                </div>

                {/* Question Text */}
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '2.5rem',
                    lineHeight: '1.5',
                    wordBreak: 'keep-all',
                    fontSize: '1.4rem',
                    color: '#4A4A4A'
                }}>
                    {currentQuestion.question}
                </h2>

                {/* Answer Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentQuestion.answers.map((answer, idx) => (
                        <button
                            key={idx}
                            onClick={() => onAnswer(currentQuestion.type, answer.type)}
                            style={{
                                padding: '1.2rem',
                                borderRadius: '15px',
                                background: '#FFF',
                                border: '2px solid #FFC0CB',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                fontSize: '1.05rem',
                                textAlign: 'left',
                                transition: '0.2s',
                                cursor: 'pointer',
                                color: '#555',
                                width: '100%'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.border = '2px solid #FF6B6B';
                                e.currentTarget.style.background = '#FFF5E1';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.border = '2px solid #FFC0CB';
                                e.currentTarget.style.background = '#FFF';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionScreen;

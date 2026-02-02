import React from 'react';
import { questions } from '../data/questions';
import { locales } from '../data/locales';

const QuestionScreen = ({ questionIndex, onAnswer, isDarkMode, language }) => {
    const currentQuestion = questions[questionIndex];
    const progress = ((questionIndex + 1) / questions.length) * 100;
    const t = locales[language];

    const theme = {
        background: isDarkMode ? '#1a1a2e' : '#FFE5E5',
        cardBackground: isDarkMode ? '#16213e' : '#FFF0F0',
        progressBarBg: isDarkMode ? '#0f3460' : '#FFF',
        progressBarFill: isDarkMode ? '#e94560' : '#FF6B6B',
        progressBarBorder: isDarkMode ? '#e94560' : '#FFC0CB',
        qNumberColor: isDarkMode ? '#e94560' : '#FF6B6B',
        questionText: isDarkMode ? '#e0e0e0' : '#4A4A4A',
        buttonBg: isDarkMode ? '#0f3460' : '#FFF',
        buttonBorder: isDarkMode ? '#e94560' : '#FFC0CB',
        buttonText: isDarkMode ? '#fff' : '#555',
        buttonHoverBg: isDarkMode ? '#1a1a2e' : '#FFF5E1',
        buttonHoverBorder: isDarkMode ? '#ff6b6b' : '#FF6B6B'
    };

    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: theme.background,
            padding: '2rem',
            transition: 'background-color 0.5s ease'
        }}>
            <div style={{
                background: theme.cardBackground,
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'background-color 0.5s ease'
            }}>
                {/* Progress Bar Container */}
                <div style={{
                    width: '100%',
                    height: '10px',
                    background: theme.progressBarBg,
                    borderRadius: '5px',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    border: `1px solid ${theme.progressBarBorder}`,
                    transition: 'all 0.5s ease'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: theme.progressBarFill,
                        transition: 'width 0.5s ease, background-color 0.5s ease',
                        borderRadius: '5px'
                    }}></div>
                </div>

                {/* Question Number */}
                <div style={{
                    color: theme.qNumberColor,
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontFamily: '"Gaegu", sans-serif',
                    transition: 'color 0.5s ease'
                }}>
                    {t.questionProgress.replace('{current}', questionIndex + 1)}
                </div>

                {/* Question Text */}
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '2.5rem',
                    lineHeight: '1.5',
                    wordBreak: 'keep-all',
                    fontSize: '1.4rem',
                    color: theme.questionText,
                    transition: 'color 0.5s ease'
                }}>
                    {currentQuestion.question[language]}
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
                                background: theme.buttonBg,
                                border: `2px solid ${theme.buttonBorder}`,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                fontSize: '1.05rem',
                                textAlign: 'left',
                                transition: '0.2s',
                                cursor: 'pointer',
                                color: theme.buttonText,
                                width: '100%'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.border = `2px solid ${theme.buttonHoverBorder}`;
                                e.currentTarget.style.background = theme.buttonHoverBg;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.border = `2px solid ${theme.buttonBorder}`;
                                e.currentTarget.style.background = theme.buttonBg;
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {answer.text[language]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionScreen;

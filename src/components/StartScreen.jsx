import React, { useState } from 'react';
import { locales } from '../data/locales';


const StartScreen = ({ onStart, isDarkMode, language }) => {
    const [name, setName] = useState('');
    const t = locales[language]; // Current locale texts

    const handleStartClick = () => {
        console.log("Start button clicked manually:", name);
        if (name.trim()) {
            onStart(name);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleStartClick();
        }
    };

    const theme = {
        background: isDarkMode ? '#1a1a2e' : '#FFE5E5',
        cardBackground: isDarkMode ? '#16213e' : '#FFF0F0',
        titleColor: isDarkMode ? '#e94560' : '#8B4513',
        subTextColor: isDarkMode ? '#e0e0e0' : '#A0522D',
        inputBackground: isDarkMode ? '#0f3460' : '#FFF',
        inputBorder: isDarkMode ? '#e94560' : '#FFC0CB',
        inputText: isDarkMode ? '#fff' : '#555',
        buttonActive: isDarkMode ? '#e94560' : '#FF6B6B',
        buttonInactive: isDarkMode ? '#333' : '#E0E0E0',
        sectionTitle: isDarkMode ? '#e94560' : '#8B4513',
        descText: isDarkMode ? '#e0e0e0' : '#555'
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
                padding: '3rem 2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'background-color 0.5s ease'
            }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>🐾</div>

                <h1 style={{
                    fontSize: '2.5rem',
                    color: theme.titleColor,
                    marginBottom: '1rem',
                    fontFamily: '"Gaegu", sans-serif',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    transition: 'color 0.5s ease'
                }} dangerouslySetInnerHTML={{ __html: t.startTitle }}>
                </h1>

                <p style={{
                    color: theme.subTextColor,
                    marginBottom: '2.5rem',
                    fontSize: '1.1rem',
                    transition: 'color 0.5s ease'
                }}>
                    {t.startSubtitle}
                </p>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        style={{
                            padding: '1rem',
                            borderRadius: '30px',
                            border: `2px solid ${theme.inputBorder}`,
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            outline: 'none',
                            background: theme.inputBackground,
                            width: '100%',
                            fontFamily: 'inherit',
                            color: theme.inputText,
                            transition: 'all 0.5s ease'
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleStartClick}
                        disabled={!name.trim()}
                        style={{
                            padding: '1rem',
                            borderRadius: '30px',
                            background: name.trim() ? theme.buttonActive : theme.buttonInactive,
                            color: '#fff',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            transition: '0.3s',
                            width: '100%',
                            boxShadow: name.trim() ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                            cursor: name.trim() ? 'pointer' : 'default',
                            border: 'none'
                        }}
                    >
                        {t.startBtn}
                    </button>
                </div>
            </div>

            {/* Description Section for Content Value */}
            <div style={{
                marginTop: '3rem',
                maxWidth: '600px',
                textAlign: 'center',
                padding: '0 1rem'
            }}>
                <h3 style={{
                    color: theme.sectionTitle,
                    fontSize: '1.3rem',
                    marginBottom: '1rem',
                    fontFamily: '"Gaegu", sans-serif',
                    transition: 'color 0.5s ease'
                }}>
                    {t.startDescriptionTitle}
                </h3>
                <p style={{
                    color: theme.descText,
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    wordBreak: 'keep-all',
                    transition: 'color 0.5s ease'
                }}>
                    {t.startDescription}
                </p>
            </div>

            <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    );
};

export default StartScreen;

import React, { useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import { results } from '../data/results';
import { locales } from '../data/locales';

const CollectionScreen = ({ onBack, isDarkMode, language }) => {
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const t = locales[language];

    const theme = {
        background: isDarkMode ? '#1a1a2e' : '#FFE5E5',
        titleColor: isDarkMode ? '#e94560' : '#8B4513',
        cardBg: isDarkMode ? '#16213e' : '#FFF',
        cardBorder: isDarkMode ? '#e94560' : '#FFC0CB',
        cardText: isDarkMode ? '#fff' : '#8B4513',
        cardSubText: isDarkMode ? '#aaa' : '#A0522D',
        modalBg: isDarkMode ? '#16213e' : '#FFF0F0',
        modalText: isDarkMode ? '#fff' : '#8B4513',
        modalCloseBtn: isDarkMode ? '#e94560' : '#8B4513',
        modalContentBg: isDarkMode ? '#0f3460' : '#FFF',
        modalContentText: isDarkMode ? '#e0e0e0' : '#555',
        buttonBg: isDarkMode ? '#e94560' : '#FF6B6B'
    };

    return (
        <div className="fade-in" style={{
            minHeight: '100vh',
            backgroundColor: theme.background,
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'background-color 0.5s ease'
        }}>
            {/* <Helmet>
                <title>동물 친구 도감 - 어린이 마음 동물 MBTI</title>
                <meta name="description" content="모든 MBTI 동물 친구들을 만나보세요!" />
            </Helmet> */}
            <h1 style={{
                fontSize: '2rem',
                color: theme.titleColor,
                fontFamily: '"Gaegu", sans-serif',
                marginBottom: '2rem',
                textAlign: 'center',
                transition: 'color 0.5s ease'
            }}>
                {t.collectionTitle}
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                width: '100%',
                maxWidth: '600px',
                paddingBottom: '160px' // 버튼이나 풋터와 겹치지 않도록 여백 충분히 확보
            }}>
                {Object.entries(results).map(([type, data]) => {
                    const currentCharacter = data.character[language];
                    // 이모지 추출 로직 (ResultScreen과 동일)
                    const emoji = data.animal === '곰' ? '🐻' :
                        data.animal === '펭귄' ? '🐧' :
                            data.animal === '부엉이' ? '🦉' :
                                data.animal === '여우' ? '🦊' :
                                    data.animal === '비버' ? '🦫' :
                                        data.animal === '고양이' ? '🐱' :
                                            data.animal === '돌고래' ? '🐬' :
                                                data.animal === '침팬지' ? '🐒' :
                                                    data.animal === '호랑이' ? '🐯' :
                                                        data.animal === '강아지' ? '🐶' :
                                                            data.animal === '다람쥐' ? '🐿️' :
                                                                data.animal === '앵무새' ? '🦜' :
                                                                    data.animal === '사자' ? '🦁' :
                                                                        data.animal === '코끼리' ? '🐘' :
                                                                            data.animal === '골든 리트리버' ? '🐕' :
                                                                                '🦅';

                    return (
                        <div key={type}
                            onClick={() => setSelectedAnimal({ type, ...data, emoji, characterName: currentCharacter, descriptionList: data.description[language] })}
                            style={{
                                background: theme.cardBg,
                                borderRadius: '15px',
                                padding: '1rem',
                                border: `2px solid ${theme.cardBorder}`,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: '0.2s',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{emoji}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.cardText, transition: 'color 0.5s ease' }}>
                                {currentCharacter}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: theme.cardSubText, marginTop: '4px', transition: 'color 0.5s ease' }}>{type}</div>
                        </div>
                    );
                })}
            </div>

            {/* 하단 고정 버튼 */}
            <div style={{
                position: 'fixed',
                bottom: '80px', // 풋터 높이 고려
                zIndex: 10
            }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        background: theme.buttonBg,
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        border: 'none',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        transition: 'background-color 0.5s ease'
                    }}
                >
                    {t.backBtn}
                </button>
            </div>

            {/* 상세 보기 모달 */}
            {selectedAnimal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }} onClick={() => setSelectedAnimal(null)}>
                    <div style={{
                        background: theme.modalBg,
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '20px',
                        padding: '2rem',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        textAlign: 'center',
                        transition: 'background-color 0.5s ease'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedAnimal(null)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                color: theme.modalCloseBtn,
                                cursor: 'pointer',
                                transition: 'color 0.5s ease'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>
                            {selectedAnimal.emoji}
                        </div>
                        <h2 style={{
                            fontSize: '1.8rem',
                            color: theme.modalText,
                            marginBottom: '0.5rem',
                            fontFamily: '"Gaegu", sans-serif',
                            transition: 'color 0.5s ease'
                        }}>
                            {selectedAnimal.characterName}
                        </h2>
                        <div style={{ color: theme.cardSubText, marginBottom: '1.5rem', fontWeight: 'bold', transition: 'color 0.5s ease' }}>
                            ({selectedAnimal.type})
                        </div>

                        <div style={{
                            textAlign: 'left',
                            background: theme.modalContentBg,
                            padding: '1rem',
                            borderRadius: '10px',
                            border: `1px solid ${theme.cardBorder}`,
                            fontSize: '0.95rem',
                            color: theme.modalContentText,
                            lineHeight: '1.6',
                            transition: 'background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease'
                        }}>
                            <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                {Array.isArray(selectedAnimal.descriptionList) ?
                                    selectedAnimal.descriptionList.slice(0, 3).map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    )) : <li>{selectedAnimal.descriptionList}</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default CollectionScreen;

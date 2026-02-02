import React, { useState } from 'react';
import { results } from '../data/results';

const CollectionScreen = ({ onBack }) => {
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    return (
        <div className="fade-in" style={{
            minHeight: '100vh',
            backgroundColor: '#FFE5E5',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1 style={{
                fontSize: '2rem',
                color: '#8B4513',
                fontFamily: '"Gaegu", sans-serif',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                동물 친구 도감 📖
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
                            onClick={() => setSelectedAnimal({ type, ...data, emoji })}
                            style={{
                                background: '#FFF',
                                borderRadius: '15px',
                                padding: '1rem',
                                border: '2px solid #FFC0CB',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: '0.2s',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{emoji}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#8B4513' }}>
                                {data.character.split(' ')[0]} {data.character.split(' ')[1]}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#A0522D', marginTop: '4px' }}>{type}</div>
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
                        background: '#FF6B6B',
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        border: 'none',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                    }}
                >
                    돌아가기
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
                        background: '#FFF0F0',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '20px',
                        padding: '2rem',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        textAlign: 'center'
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
                                color: '#8B4513',
                                cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>
                            {selectedAnimal.emoji}
                        </div>
                        <h2 style={{
                            fontSize: '1.8rem',
                            color: '#8B4513',
                            marginBottom: '0.5rem',
                            fontFamily: '"Gaegu", sans-serif'
                        }}>
                            {selectedAnimal.character}
                        </h2>
                        <div style={{ color: '#A0522D', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                            ({selectedAnimal.type})
                        </div>

                        <div style={{
                            textAlign: 'left',
                            background: '#FFF',
                            padding: '1rem',
                            borderRadius: '10px',
                            border: '1px solid #FFC0CB',
                            fontSize: '0.95rem',
                            color: '#555',
                            lineHeight: '1.6'
                        }}>
                            <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                {Array.isArray(selectedAnimal.description) ?
                                    selectedAnimal.description.slice(0, 3).map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    )) : <li>{selectedAnimal.description}</li>
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

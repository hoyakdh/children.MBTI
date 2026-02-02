import React, { useState } from 'react';

const StartScreen = ({ onStart }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name);
        }
    };

    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#FFE5E5', // Soft Pink Background to match ResultScreen
            padding: '2rem'
        }}>
            <div style={{
                background: '#FFF0F0',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                padding: '3rem 2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>🐾</div>

                <h1 style={{
                    fontSize: '2.5rem',
                    color: '#8B4513',
                    marginBottom: '1rem',
                    fontFamily: '"Gaegu", sans-serif',
                    fontWeight: 'bold',
                    lineHeight: '1.2'
                }}>
                    우리 아이 마음 동물<br />MBTI 도감
                </h1>

                <p style={{
                    color: '#A0522D',
                    marginBottom: '2.5rem',
                    fontSize: '1.1rem'
                }}>
                    나의 성격은 어떤 동물과 닮았을까요?
                </p>

                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="이름을 입력해주세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: '1rem',
                            borderRadius: '30px',
                            border: '2px solid #FFC0CB',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            outline: 'none',
                            background: '#FFF',
                            width: '100%',
                            fontFamily: 'inherit',
                            color: '#555'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        style={{
                            padding: '1rem',
                            borderRadius: '30px',
                            background: name.trim() ? '#FF6B6B' : '#E0E0E0',
                            color: '#fff',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            transition: '0.3s',
                            width: '100%',
                            boxShadow: name.trim() ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                            cursor: name.trim() ? 'pointer' : 'default'
                        }}
                    >
                        시작하기
                    </button>
                </form>
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

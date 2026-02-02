import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { results } from '../data/results';

const ResultScreen = ({ mbti, userName, onReset, onCollection }) => {
    const resultData = results[mbti];
    const topRef = useRef(null);
    const captureRef = useRef(null);

    const handleDownloadPDF = async () => {
        if (!captureRef.current) return;

        try {
            const canvas = await html2canvas(captureRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                windowWidth: 1024,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.querySelector('.capture-target');
                    if (element) {
                        element.style.background = '#ffffff';
                        element.style.width = '600px';
                        element.style.maxWidth = 'none';
                        element.style.margin = '0';
                        element.style.padding = '30px';
                        element.style.boxShadow = 'none';
                        element.style.animation = 'none';
                        element.style.transform = 'none';

                        const animated = element.querySelectorAll('*');
                        animated.forEach(el => {
                            el.style.animation = 'none';
                            el.style.transform = 'none';
                        });
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            if (imgHeight > pdfHeight) {
                const fitWidth = (pdfWidth * pdfHeight) / imgHeight;
                const centerX = (pdfWidth - fitWidth) / 2;
                pdf.addImage(imgData, 'PNG', centerX, 0, fitWidth, pdfHeight);
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            pdf.save(`${userName}_마음동물결과.pdf`);
        } catch (err) {
            console.error("PDF 저장 중 오류 발생:", err);
            alert("PDF 저장에 실패했어요. 😢");
        }
    };

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!resultData) return <div>결과를 찾을 수 없습니다.</div>;

    return (
        <div className="fade-in" ref={topRef} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '2rem',
            backgroundColor: '#FFE5E5',
            minHeight: '100vh',
            padding: '2rem 1rem'
        }}>

            {/* Main Card Container */}
            <div ref={captureRef} className="capture-target" style={{
                background: '#FFF0F0',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                {/* 1. Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>
                        {userName}의 마음 동물은?
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        color: '#8B4513',
                        margin: 0,
                        fontFamily: '"Gaegu", sans-serif',
                        fontWeight: 'bold'
                    }}>
                        {resultData.character.split(' ')[0]} {resultData.character.split(' ')[1]}
                    </h1>
                    <div style={{ fontSize: '1.2rem', color: '#A0522D', marginTop: '0.2rem' }}>
                        ({mbti})
                    </div>
                </div>

                {/* 2. Character Image */}
                <div style={{ fontSize: '7rem', marginBottom: '2rem', animation: 'float 3s ease-in-out infinite' }}>
                    {
                        resultData.animal === '곰' ? '🐻' :
                            resultData.animal === '펭귄' ? '🐧' :
                                resultData.animal === '부엉이' ? '🦉' :
                                    resultData.animal === '여우' ? '🦊' :
                                        resultData.animal === '비버' ? '🦫' :
                                            resultData.animal === '고양이' ? '🐱' :
                                                resultData.animal === '돌고래' ? '🐬' :
                                                    resultData.animal === '침팬지' ? '🐒' :
                                                        resultData.animal === '호랑이' ? '🐯' :
                                                            resultData.animal === '강아지' ? '🐶' :
                                                                resultData.animal === '다람쥐' ? '🐿️' :
                                                                    resultData.animal === '앵무새' ? '🦜' :
                                                                        resultData.animal === '사자' ? '🦁' :
                                                                            resultData.animal === '코끼리' ? '🐘' :
                                                                                resultData.animal === '골든 리트리버' ? '🐕' :
                                                                                    '🦅'
                    }
                </div>

                {/* 3. Description (나는 이런 친구야!) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#8B0000', borderBottom: '2px solid #8B0000', paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '0', textAlign: 'left' }}>
                        나는 이런 친구야!
                    </h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                        {Array.isArray(resultData.description) ? resultData.description.map((desc, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#555', display: 'flex' }}>
                                <span style={{ color: '#CD5C5C', marginRight: '8px' }}>•</span>
                                {desc}
                            </li>
                        )) : (
                            <li style={{ fontSize: '1rem', color: '#555' }}>{resultData.description}</li>
                        )}
                    </ul>
                </div>

                {/* 4. Chart (나의 마음 능력치!) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#8B0000', borderBottom: '2px solid #8B0000', paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
                        나의 마음 능력치! 📊
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {Object.entries({
                            energy: "활달함",
                            warmth: "따뜻함",
                            creativity: "창의력",
                            thoroughness: "꼼꼼함",
                            leadership: "리더십"
                        }).map(([key, label]) => (
                            <div key={key} style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                                <span style={{ width: '60px', fontWeight: 'bold', color: '#8B4513' }}>{label}</span>
                                <div style={{ flex: 1, height: '10px', background: '#FFF', borderRadius: '5px', overflow: 'hidden', border: '1px solid #E0E0E0' }}>
                                    <div style={{
                                        width: `${resultData.features[key] * 20}%`,
                                        height: '100%',
                                        background: '#FFB6C1', // Light pink bar
                                        borderRadius: '5px'
                                    }}></div>
                                </div>
                                <span style={{ marginLeft: '8px', color: '#888', fontSize: '0.8rem', width: '10px' }}>{resultData.features[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Strengths (이럴 때 힘이 쑥쑥 나!) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#8B0000', borderBottom: '2px solid #8B0000', paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
                        이럴 때 힘이 쑥쑥 나!
                    </h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                        {resultData.strengths.map((str, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#555', display: 'flex' }}>
                                <span style={{ color: '#CD5C5C', marginRight: '8px' }}>•</span>
                                {str}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 6. Best Friends (나랑 잘 맞는 동물 친구는?) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#8B0000', borderBottom: '2px solid #8B0000', paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
                        나랑 잘 맞는 동물 친구는?
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {resultData.bestMatch.map((friend, i) => (
                            <div key={i} style={{
                                background: '#FFF',
                                padding: '0.8rem',
                                borderRadius: '10px',
                                border: '1px solid #FFC0CB',
                                fontSize: '0.95rem',
                                color: '#555'
                            }}>
                                <strong>{friend}</strong>
                                <br />
                                <span style={{ fontSize: '0.85rem', color: '#888' }}>
                                    함께라면 더 즐거울 거야!
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. Tip (더 멋진 내가 되려면?) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#8B0000', borderBottom: '2px solid #8B0000', paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
                        더 멋진 내가 되려면?
                    </h3>
                    <div style={{
                        background: '#FFF5E1', // Light yellow for tip
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        color: '#555',
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}>
                        <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💡</span>
                        <div>
                            엄마, 아빠가 해주는 이 말을 기억해봐!<br />
                            <span style={{ fontWeight: 'bold', color: '#D2691E' }}>"{resultData.tip}"</span>
                        </div>
                    </div>
                </div>

                {/* 8. Books (너를 위한 추천 도서!) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#8B0000', borderBottom: '2px solid #8B0000', paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
                        너를 위한 추천 도서! 📚
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {resultData.books.map((book, i) => (
                            <div key={i} style={{
                                background: '#F0F8FF',
                                padding: '0.8rem',
                                borderRadius: '10px',
                                color: '#333',
                                fontSize: '0.95rem'
                            }}>
                                📖 <strong>{book}</strong>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                    onClick={onReset}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '30px',
                        background: '#FF6B6B', // Stronger pink/red for button
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    다시 하기
                </button>

                <button
                    onClick={handleDownloadPDF}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '30px',
                        background: '#4ECDC4', // Mint/Teal color to differentiate
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    PDF 저장 📥
                </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={onCollection}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '20px',
                        background: '#FFF',
                        color: '#8B4513',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: '2px solid #8B4513',
                        cursor: 'pointer',
                        transition: '0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = '#8B4513';
                        e.currentTarget.style.color = '#FFF';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = '#FFF';
                        e.currentTarget.style.color = '#8B4513';
                    }}
                >
                    다른 친구들 구경하기 🐾
                </button>
            </div>

            <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
        </div>
    );
};

export default ResultScreen;

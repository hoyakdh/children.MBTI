import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { results } from '../data/results';

const ResultScreen = ({ mbti, userName, onReset }) => {
    const [showModal, setShowModal] = useState(false);
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
                windowWidth: 1024, // 가상 윈도우 너비를 설정하여 모바일 뷰 렌더링 방지
                onclone: (clonedDoc) => {
                    // 캡처 대상 요소 찾기 (id를 추가할 예정)
                    const element = clonedDoc.querySelector('.capture-target');
                    if (element) {
                        // 스타일 강제 조정
                        element.style.background = '#ffffff'; // 인쇄용 흰색 배경
                        element.style.width = '600px'; // A4 폭에 적당한 px 너비 고정
                        element.style.maxWidth = 'none';
                        element.style.margin = '0';
                        element.style.padding = '30px';
                        element.style.boxShadow = 'none';
                        element.style.animation = 'none';
                        element.style.transform = 'none';

                        // 하위 요소 애니메이션 제거
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

            // 이미지가 A4 폭에 맞게 스케일
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            // 내용이 A4 높이를 넘어가면? 
            // 1. 비율 유지해서 한 장에 맞추기 (fit)
            if (imgHeight > pdfHeight) {
                // 세로 길이에 맞춰서 비율 축소
                const fitWidth = (pdfWidth * pdfHeight) / imgHeight;
                const centerX = (pdfWidth - fitWidth) / 2;
                pdf.addImage(imgData, 'PNG', centerX, 0, fitWidth, pdfHeight);
            } else {
                // 한 장 안에 들어오면 위쪽에 붙여서 출력
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
            backgroundColor: '#FFE5E5', // Soft Pink Background
            minHeight: '100vh',
            padding: '2rem 1rem'
        }}>

            {/* Main Card Container */}
            <div ref={captureRef} className="capture-target" style={{
                background: '#FFF0F0', // Slightly lighter pink for card
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
                        color: '#8B4513', // Brownish text
                        margin: 0,
                        fontFamily: '"Gaegu", sans-serif', // Assuming a handwritten font if available, fallback sans-serif
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

                {/* Common Section Title Style */}


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
                                {/* Score hidden visually to match image, or kept for clarity? Image has no numbers, just bars. Let's hide numbers to match image style closely, or keep small. Image has numbers! 4, 2, 1, 5, 5 in tiny text. keeping it. */}
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
                                    {/* Mock description since data is missing, or generic friendly text */}
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
                    onClick={() => setShowModal(true)}
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

            {/* Collection Modal */}
            {showModal && (
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
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        background: '#FFF0F0',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        overflowY: 'auto',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#8B4513'
                            }}
                        >
                            ✕
                        </button>

                        <h2 style={{ textAlign: 'center', color: '#8B4513', marginBottom: '1.5rem', fontFamily: '"Gaegu", sans-serif' }}>
                            동물 친구 도감 📖
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            {Object.entries(results).map(([type, data]) => {
                                // Extract emoji safely
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
                                    <div key={type} style={{
                                        background: '#FFF',
                                        padding: '1rem',
                                        borderRadius: '15px',
                                        textAlign: 'center',
                                        border: '1px solid #FFC0CB',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{emoji}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#A0522D', fontWeight: 'bold' }}>{data.character.split(' ')[0]} {data.character.split(' ')[1]}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{type}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

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

import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { results } from '../data/results';
import { locales } from '../data/locales';


const ResultScreen = ({ mbti, userName, onReset, onCollection, isDarkMode, language }) => {
    const resultData = results[mbti];
    const t = locales[language];
    const topRef = useRef(null);
    const captureRef = useRef(null);

    const theme = {
        background: isDarkMode ? '#1a1a2e' : '#FFE5E5',
        cardBackground: isDarkMode ? '#16213e' : '#FFF0F0',
        titleColor: isDarkMode ? '#e94560' : '#8B4513',
        subTextColor: isDarkMode ? '#e0e0e0' : '#888',
        mbtiColor: isDarkMode ? '#ff6b6b' : '#A0522D',
        sectionTitleColor: isDarkMode ? '#e94560' : '#8B0000',
        textColor: isDarkMode ? '#e0e0e0' : '#555',
        listItemDot: isDarkMode ? '#ff6b6b' : '#CD5C5C',
        chartLabel: isDarkMode ? '#e94560' : '#8B4513',
        chartBg: isDarkMode ? '#0f3460' : '#FFF',
        chartFill: isDarkMode ? '#e94560' : '#FFB6C1',
        friendCardBg: isDarkMode ? '#0f3460' : '#FFF',
        friendCardBorder: isDarkMode ? '#e94560' : '#FFC0CB',
        tipBg: isDarkMode ? '#0f3460' : '#FFF5E1',
        bookBg: isDarkMode ? '#0f3460' : '#F0F8FF',
        bookText: isDarkMode ? '#e0e0e0' : '#333',
        collectionBtnBg: isDarkMode ? '#0f3460' : '#FFF',
        collectionBtnText: isDarkMode ? '#e0e0e0' : '#8B4513',
        collectionBtnBorder: isDarkMode ? '#e94560' : '#8B4513',
        collectionBtnHoverBg: isDarkMode ? '#e94560' : '#8B4513',
        collectionBtnHoverText: isDarkMode ? '#FFF' : '#FFF'
    };

    const handleDownloadPDF = async () => {
        if (!captureRef.current) return;

        try {
            const canvas = await html2canvas(captureRef.current, {
                scale: 2,
                backgroundColor: '#ffffff', // Capture as white background always
                useCORS: true,
                windowWidth: 1024,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.querySelector('.capture-target');
                    if (element) {
                        element.style.background = '#ffffff';
                        element.style.color = '#000000';
                        element.style.width = '600px';
                        element.style.maxWidth = 'none';
                        element.style.margin = '0';
                        element.style.padding = '30px';
                        element.style.boxShadow = 'none';
                        element.style.animation = 'none';
                        element.style.transform = 'none';

                        // Force light theme colors for PDF
                        const textElements = element.querySelectorAll('*');
                        textElements.forEach(el => {
                            el.style.color = '#333';
                            el.style.borderColor = '#FFC0CB';
                            if (el.style.backgroundColor === 'rgb(15, 52, 96)' || el.style.backgroundColor === '#0f3460') { // Check for dark theme bg
                                element.style.backgroundColor = '#FFF';
                            }
                        });


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

            pdf.save(`${userName}_Result.pdf`);
        } catch (err) {
            console.error("PDF Fail:", err);
            alert("PDF Save Failed 😢");
        }
    };

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!resultData) return <div>Data Not Found</div>;

    const currentCharacter = resultData.character[language];

    return (
        <div className="fade-in" ref={topRef} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '2rem',
            backgroundColor: theme.background,
            minHeight: '100vh',
            padding: '2rem 1rem',
            transition: 'background-color 0.5s ease'
        }}>


            {/* Main Card Container */}
            <div ref={captureRef} className="capture-target" style={{
                background: theme.cardBackground,
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'background-color 0.5s ease'
            }}>

                {/* 1. Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.9rem', color: theme.subTextColor, marginBottom: '0.5rem', transition: 'color 0.5s ease' }}>
                        {t.resultTitle.replace('{name}', userName)}
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        color: theme.titleColor,
                        margin: 0,
                        fontFamily: '"Gaegu", sans-serif',
                        fontWeight: 'bold',
                        transition: 'color 0.5s ease'
                    }}>
                        {currentCharacter}
                    </h1>
                    <div style={{ fontSize: '1.2rem', color: theme.mbtiColor, marginTop: '0.2rem', transition: 'color 0.5s ease' }}>
                        {t.resultSubtitle.replace('{mbti}', mbti)}
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
                    <h3 style={{ fontSize: '1.2rem', color: theme.sectionTitleColor, borderBottom: `2px solid ${theme.sectionTitleColor}`, paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '0', textAlign: 'left', transition: 'color 0.5s ease, border-color 0.5s ease' }}>
                        {t.myTypeTitle}
                    </h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                        {Array.isArray(resultData.description[language]) ? resultData.description[language].map((desc, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '1rem', color: theme.textColor, display: 'flex', transition: 'color 0.5s ease' }}>
                                <span style={{ color: theme.listItemDot, marginRight: '8px', transition: 'color 0.5s ease' }}>•</span>
                                {desc}
                            </li>
                        )) : (
                            <li style={{ fontSize: '1rem', color: theme.textColor, transition: 'color 0.5s ease' }}>{resultData.description[language]}</li>
                        )}
                    </ul>
                </div>

                {/* 4. Chart (나의 마음 능력치!) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: theme.sectionTitleColor, borderBottom: `2px solid ${theme.sectionTitleColor}`, paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left', transition: 'color 0.5s ease, border-color 0.5s ease' }}>
                        {t.chartTitle}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {Object.entries({
                            energy: t.energy,
                            warmth: t.warmth,
                            creativity: t.creativity,
                            thoroughness: t.thoroughness,
                            leadership: t.leadership
                        }).map(([key, label]) => (
                            <div key={key} style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                                <span style={{ width: '80px', fontWeight: 'bold', color: theme.chartLabel, transition: 'color 0.5s ease' }}>{label}</span>
                                <div style={{ flex: 1, height: '10px', background: theme.chartBg, borderRadius: '5px', overflow: 'hidden', border: '1px solid #E0E0E0', transition: 'background-color 0.5s ease' }}>
                                    <div style={{
                                        width: `${resultData.features[key] * 20}%`,
                                        height: '100%',
                                        background: theme.chartFill,
                                        borderRadius: '5px',
                                        transition: 'background-color 0.5s ease'
                                    }}></div>
                                </div>
                                <span style={{ marginLeft: '8px', color: '#888', fontSize: '0.8rem', width: '10px' }}>{resultData.features[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Strengths (이럴 때 힘이 쑥쑥 나!) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: theme.sectionTitleColor, borderBottom: `2px solid ${theme.sectionTitleColor}`, paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left', transition: 'color 0.5s ease, border-color 0.5s ease' }}>
                        {t.strengthTitle}
                    </h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                        {resultData.strengths[language].map((str, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '1rem', color: theme.textColor, display: 'flex', transition: 'color 0.5s ease' }}>
                                <span style={{ color: theme.listItemDot, marginRight: '8px', transition: 'color 0.5s ease' }}>•</span>
                                {str}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 6. Best Friends (나랑 잘 맞는 동물 친구는?) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: theme.sectionTitleColor, borderBottom: `2px solid ${theme.sectionTitleColor}`, paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left', transition: 'color 0.5s ease, border-color 0.5s ease' }}>
                        {t.friendTitle}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {resultData.bestMatch[language].map((friend, i) => (
                            <div key={i} style={{
                                background: theme.friendCardBg,
                                padding: '0.8rem',
                                borderRadius: '10px',
                                border: `1px solid ${theme.friendCardBorder}`,
                                fontSize: '0.95rem',
                                color: theme.textColor,
                                transition: 'all 0.5s ease',
                                boxShadow: isDarkMode ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
                            }}>
                                <strong style={{ color: theme.textColor }}>{friend}</strong>
                                <br />
                                <span style={{ fontSize: '0.85rem', color: isDarkMode ? '#aaa' : '#888' }}>
                                    {t.friendDesc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. Tip (더 멋진 내가 되려면?) */}
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2rem', color: theme.sectionTitleColor, borderBottom: `2px solid ${theme.sectionTitleColor}`, paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left', transition: 'color 0.5s ease, border-color 0.5s ease' }}>
                        {t.tipTitle}
                    </h3>
                    <div style={{
                        background: theme.tipBg,
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        color: theme.textColor,
                        display: 'flex',
                        alignItems: 'flex-start',
                        transition: 'all 0.5s ease'
                    }}>
                        <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💡</span>
                        <div>
                            <span style={{ fontWeight: 'bold', color: theme.mbtiColor }}>"{resultData.tip[language]}"</span>
                        </div>
                    </div>
                </div>

                {/* 8. Books (너를 위한 추천 도서!) - Only show for Korean */}
                {language === 'ko' && (
                    <div style={{ width: '100%' }}>
                        <h3 style={{ fontSize: '1.2rem', color: theme.sectionTitleColor, borderBottom: `2px solid ${theme.sectionTitleColor}`, paddingBottom: '5px', width: '100%', marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'left', transition: 'color 0.5s ease, border-color 0.5s ease' }}>
                            {t.bookTitle}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {resultData.books[language].map((book, i) => (
                                <div key={i} style={{
                                    background: theme.bookBg,
                                    padding: '0.8rem',
                                    borderRadius: '10px',
                                    color: theme.bookText,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.5s ease'
                                }}>
                                    📖 <strong>{book}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
                    {t.retryBtn}
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
                    {t.savePdfBtn}
                </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={onCollection}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '20px',
                        background: theme.collectionBtnBg,
                        color: theme.collectionBtnText,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: `2px solid ${theme.collectionBtnBorder}`,
                        cursor: 'pointer',
                        transition: '0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = theme.collectionBtnHoverBg;
                        e.currentTarget.style.color = theme.collectionBtnHoverText;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = theme.collectionBtnBg;
                        e.currentTarget.style.color = theme.collectionBtnText;
                    }}
                >
                    {t.collectionBtn}
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

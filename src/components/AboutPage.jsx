import React from 'react';
// import { Helmet } from 'react-helmet-async';

const AboutPage = ({ isDarkMode, language }) => {
    const textColor = isDarkMode ? '#e0e0e0' : '#333';
    const containerStyle = {
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto',
        color: textColor,
        fontFamily: '"Gaegu", sans-serif',
        lineHeight: '1.6'
    };

    const titleStyle = {
        fontSize: '2rem',
        marginBottom: '20px',
        color: isDarkMode ? '#e94560' : '#FF6B6B',
        textAlign: 'center'
    };

    const sectionStyle = {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
        borderRadius: '15px'
    };

    return (
        <div style={containerStyle}>
            {/* <Helmet>
                <title>소개 - 어린이 마음 동물 MBTI</title>
                <meta name="description" content="우리 아이의 성향을 알아보는 즐거운 MBTI 테스트, 어린이 마음 동물 도감입니다." />
            </Helmet> */}

            <h1 style={titleStyle}>소개 (About Us)</h1>

            <div style={sectionStyle}>
                <h2>우리 아이 마음 동물 도감이란?</h2>
                <p>
                    모든 아이는 저마다의 특별한 빛깔을 가지고 있습니다. '우리 아이 마음 동물 도감'은 MBTI 성격 유형 이론을 바탕으로,
                    우리 아이들이 가진 고유한 성향을 친근한 동물 친구들에 빗대어 알아보는 서비스입니다.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2>만든 이유</h2>
                <p>
                    아이를 키우며 "우리 아이는 어떤 성향일까?", "어떻게 대화하면 좋을까?" 고민하는 부모님들을 위해 만들었습니다.
                    딱딱한 검사가 아니라, 아이와 함께 동물을 찾는 과정에서 서로를 더 깊이 이해하는 계기가 되기를 바랍니다.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2>특징</h2>
                <ul>
                    <li><strong>친근한 동물 캐릭터:</strong> 16가지 성격 유형을 귀여운 동물로 표현했습니다.</li>
                    <li><strong>쉬운 질문:</strong> 아이들의 일상 생활에서 볼 수 있는 상황들로 질문을 구성했습니다.</li>
                    <li><strong>다국어 지원:</strong> 한국어, 영어, 스페인어를 지원하여 다양한 문화권의 아이들도 함께 즐길 수 있습니다.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2>문의하기</h2>
                <p>
                    서비스 이용 중 불편한 점이나 제안하고 싶은 점이 있다면 언제든지 아래 이메일로 연락주세요.<br />
                    이메일: hoyakdh@icloud.com
                </p>
            </div>
        </div>
    );
};

export default AboutPage;

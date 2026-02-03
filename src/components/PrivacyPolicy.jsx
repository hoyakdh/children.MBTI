import React from 'react';
// import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = ({ isDarkMode }) => {
    const textColor = isDarkMode ? '#e0e0e0' : '#333';
    const containerStyle = {
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto',
        color: textColor,
        fontFamily: '"Gaegu", sans-serif',
        lineHeight: '1.6',
        wordBreak: 'keep-all'
    };

    const titleStyle = {
        fontSize: '2rem',
        marginBottom: '20px',
        color: isDarkMode ? '#e94560' : '#FF6B6B',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            {/* <Helmet>
                <title>개인정보처리방침 - 어린이 마음 동물 MBTI</title>
                <meta name="description" content="어린이 마음 동물 MBTI 서비스의 개인정보처리방침입니다." />
            </Helmet> */}

            <h1 style={titleStyle}>개인정보처리방침 (Privacy Policy)</h1>

            <p>본 개인정보처리방침은 '어린이 마음 동물 MBTI(성향) 도감' (이하 '사이트')이 이용자의 개인정보를 어떻게 수집, 사용, 보호하는지 설명합니다.</p>

            <h2>1. 수집하는 개인정보</h2>
            <p>본 사이트는 별도의 회원가입 절차 없이 이용 가능하며, 서비스 이용을 위해 사용자가 입력하는 닉네임, 테스트 결과 데이터는 브라우저 세션 또는 로컬 환경에서만 처리되며 서버에 영구 저장되지 않습니다.</p>

            <h2>2. 쿠키(Cookie)의 운용 및 거부</h2>
            <p>본 사이트는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
            <ul>
                <li>쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.</li>
                <li><strong>Google AdSense 광고:</strong> 본 사이트는 광고 게재를 위해 Google AdSense를 사용합니다. Google 및 파트너는 쿠키를 사용하여 사용자의 본 사이트 또는 다른 웹사이트 방문 기록을 기반으로 광고를 게재할 수 있습니다. 사용자는 언제든지 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: isDarkMode ? '#64b5f6' : '#1976d2' }}>Google 광고 설정</a>에서 맞춤형 광고를 해제할 수 있습니다.</li>
            </ul>

            <h2>3. 개인정보의 제3자 제공</h2>
            <p>본 사이트는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.</p>

            <h2>4. 개인정보의 보호</h2>
            <p>본 사이트는 이용자의 개인정보를 보호하기 위해 기술적/관리적 대책을 강구하고 있습니다. 그러나 인터넷 상의 데이터 전송은 100% 안전을 보장할 수 없음을 유의해 주시기 바랍니다.</p>

            <h2>5. 개인정보 처리방침의 변경</h2>
            <p>본 개인정보처리방침은 법령 또는 서비스 변경 사항을 반영하기 위해 수정될 수 있습니다. 변경 사항은 사이트를 통해 공지됩니다.</p>

            <h2>6. 문의</h2>
            <p>개인정보 관련 문의사항은 hoyakdh@icloud.com 으로 연락주시기 바랍니다.</p>

            <p style={{ marginTop: '40px', fontSize: '0.9rem', color: isDarkMode ? '#888' : '#666' }}>
                최종 수정일: 2026년 2월 3일
            </p>
        </div>
    );
};

export default PrivacyPolicy;

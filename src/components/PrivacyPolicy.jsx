import React from 'react';
import { Helmet } from 'react-helmet-async';
import { locales } from '../data/locales';

const PrivacyPolicy = ({ isDarkMode, language }) => {
    const textColor = isDarkMode ? '#e0e0e0' : '#333';
    const t = locales[language] || locales['ko']; // Fallback to ko if undefined

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
            <Helmet>
                <title>{t.privacy.title}</title>
                <meta name="description" content={t.privacy.intro} />
            </Helmet>

            <h1 style={titleStyle}>{t.privacy.title}</h1>

            <p>{t.privacy.intro}</p>

            <h2>{t.privacy.collectionTitle}</h2>
            <p>{t.privacy.collectionDesc}</p>

            <h2>{t.privacy.cookieTitle}</h2>
            <p>{t.privacy.cookieDesc}</p>
            <ul>
                <li>{t.privacy.cookieList1}</li>
                <li>{t.privacy.cookieList2} <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: isDarkMode ? '#64b5f6' : '#1976d2' }}>Google Ad Settings</a></li>
            </ul>

            <h2>{t.privacy.thirdPartyTitle}</h2>
            <p>{t.privacy.thirdPartyDesc}</p>

            <h2>{t.privacy.protectionTitle}</h2>
            <p>{t.privacy.protectionDesc}</p>

            <h2>{t.privacy.changeTitle}</h2>
            <p>{t.privacy.changeDesc}</p>

            <h2>{t.privacy.inquiryTitle}</h2>
            <p>{t.privacy.inquiryDesc}</p>

            <p style={{ marginTop: '40px', fontSize: '0.9rem', color: isDarkMode ? '#888' : '#666' }}>
                {t.privacy.lastModified}
            </p>
        </div>
    );
};

export default PrivacyPolicy;

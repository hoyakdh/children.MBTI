import React from 'react';

import { locales } from '../data/locales';

const AboutPage = ({ isDarkMode, language }) => {
    const textColor = isDarkMode ? '#e0e0e0' : '#333';
    const t = locales[language];

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


            <h1 style={titleStyle}>{t.about.title}</h1>

            <div style={sectionStyle}>
                <h2>{t.about.introTitle}</h2>
                <p>
                    {t.about.introDesc}
                </p>
            </div>

            <div style={sectionStyle}>
                <h2>{t.about.reasonTitle}</h2>
                <p>
                    {t.about.reasonDesc}
                </p>
            </div>

            <div style={sectionStyle}>
                <h2>{t.about.featureTitle}</h2>
                <ul>
                    <li>{t.about.feature1}</li>
                    <li>{t.about.feature2}</li>
                    <li>{t.about.feature3}</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2>{t.about.contactTitle}</h2>
                <p>
                    {t.about.contactDesc}<br />
                    mailto: hoyakdh@icloud.com
                </p>
            </div>
        </div>
    );
};

export default AboutPage;

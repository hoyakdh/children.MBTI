import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import CollectionScreen from './components/CollectionScreen';
import AboutPage from './components/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import { questions } from './data/questions';
import { locales } from './data/locales';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. State Definitions (Declared first to avoid hoisting issues)
  const [userName, setUserName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ko');

  // 2. Side Effects
  useEffect(() => {
    // Reset state when returning to home
    if (location.pathname === '/') {
      setQuestionIndex(0);
      setScores({
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
      });
      setUserName('');
    }
  }, [location.pathname]);

  // 3. Helper Functions & Handlers
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleStart = (name) => {
    console.log("Start button clicked. Name:", name);
    setUserName(name);
    navigate('/test');
  };

  const handleAnswer = (type, value) => {
    // type: "EI", "SN", "TF", "JP"
    // value: "E", "I", "S", "N", "T", "F", "J", "P"
    console.log("Answer selected:", type, value);

    setScores(prev => ({
      ...prev,
      [value]: prev[value] + 1
    }));

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      console.log("Quiz finished. Navigating to result.");
      navigate('/result');
    }
  };

  const calculateMBTI = () => {
    let mbti = '';
    mbti += scores.E >= scores.I ? 'E' : 'I';
    mbti += scores.S >= scores.N ? 'S' : 'N';
    mbti += scores.T >= scores.F ? 'T' : 'F';
    mbti += scores.J >= scores.P ? 'J' : 'P';
    return mbti;
  };

  const handleReset = () => {
    navigate('/');
  };

  const handleCollection = () => {
    navigate('/collection');
  };

  // Theme Constants
  const theme = {
    light: {
      background: '#FFE5E5',
      footerBackground: '#FFE5E5',
      text: '#8B4513'
    },
    dark: {
      background: '#1a1a2e',
      footerBackground: '#1a1a2e',
      text: '#e94560'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <HelmetProvider>
      <div className="app-container" style={{ position: 'relative', backgroundColor: currentTheme.background, minHeight: '100vh', transition: 'background-color 0.5s ease' }}>

        {/* Top Bar: Dark Mode & Language Toggles */}
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: isDarkMode ? '#e94560' : '#FFF',
              color: isDarkMode ? '#FFF' : '#222',
              border: isDarkMode ? 'none' : '1px solid #ddd',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '5px'
            }}
            title="Home"
          >
            🏠
          </button>

          {/* Language Toggle */}
          <div style={{
            display: 'flex',
            background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
            borderRadius: '20px',
            padding: '5px',
            backdropFilter: 'blur(5px)'
          }}>
            {['ko', 'en', 'es'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  border: 'none',
                  background: language === lang ? (isDarkMode ? '#e94560' : '#FF6B6B') : 'transparent',
                  color: language === lang ? '#fff' : (isDarkMode ? '#e0e0e0' : '#8B4513'),
                  padding: '5px 10px',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s'
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              background: isDarkMode ? '#e94560' : '#FFF',
              color: isDarkMode ? '#FFF' : '#222',
              border: isDarkMode ? 'none' : '1px solid #ddd',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<StartScreen onStart={handleStart} isDarkMode={isDarkMode} language={language} />} />
          <Route path="/test" element={
            <QuestionScreen
              questionIndex={questionIndex}
              onAnswer={handleAnswer}
              isDarkMode={isDarkMode}
              language={language}
            />
          } />

          <Route path="/result" element={
            <ResultScreen
              mbti={calculateMBTI()}
              userName={userName}
              onReset={handleReset}
              onCollection={handleCollection}
              isDarkMode={isDarkMode}
              language={language}
            />
          } />
          <Route path="/collection" element={<CollectionScreen onBack={() => navigate(-1)} isDarkMode={isDarkMode} language={language} />} />
          <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} language={language} />} />
          <Route path="/privacy" element={<PrivacyPolicy isDarkMode={isDarkMode} language={language} />} />
        </Routes>

        <footer style={{
          textAlign: 'center',
          padding: '2rem 0',
          color: currentTheme.text,
          fontSize: '0.9rem',
          fontFamily: '"Gaegu", sans-serif',
          background: currentTheme.footerBackground,
          width: '100%',
          transition: 'all 0.5s ease',
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div>{locales[language].footer.creator}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button onClick={() => navigate('/about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit' }}>{locales[language].footer.aboutBtn}</button>
            <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit' }}>{locales[language].footer.privacyBtn}</button>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import CollectionScreen from './components/CollectionScreen';
import { questions } from './data/questions';

function App() {
  const [step, setStep] = useState('start'); // start, question, result, collection
  const [userName, setUserName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  });

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Language State
  const [language, setLanguage] = useState('ko'); // ko, en, es

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleStart = (name) => {
    setUserName(name);
    setStep('question');
  };

  const handleAnswer = (type, value) => {
    // type: "EI", "SN", "TF", "JP"
    // value: "E", "I", "S", "N", "T", "F", "J", "P"

    setScores(prev => ({
      ...prev,
      [value]: prev[value] + 1
    }));

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setStep('result');
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
    setStep('start');
    setQuestionIndex(0);
    setScores({
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    });
    setUserName('');
  };

  const handleCollection = () => {
    setStep('collection');
  };

  const handleBackToResult = () => {
    if (scores.E === 0 && scores.I === 0 && scores.S === 0 && scores.N === 0) { // 점수 초기화 상태면 시작 화면
      setStep('start');
    } else {
      setStep('result');
    }
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

      {step === 'start' && <StartScreen onStart={handleStart} isDarkMode={isDarkMode} language={language} />}

      {step === 'question' && (
        <QuestionScreen
          questionIndex={questionIndex}
          onAnswer={handleAnswer}
          isDarkMode={isDarkMode}
          language={language}
        />
      )}

      {step === 'result' && (
        <ResultScreen
          mbti={calculateMBTI()}
          userName={userName}
          onReset={handleReset}
          onCollection={handleCollection}
          isDarkMode={isDarkMode}
          language={language}
        />
      )}

      {step === 'collection' && (
        <CollectionScreen onBack={handleBackToResult} isDarkMode={isDarkMode} language={language} />
      )}

      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        color: currentTheme.text,
        fontSize: '1rem',
        fontFamily: '"Gaegu", sans-serif',
        background: currentTheme.footerBackground,
        width: '100%',
        transition: 'all 0.5s ease',
        marginTop: 'auto'
      }}>
        제작자: hoyakdh@icloud.com
      </footer>
    </div>
  );
}

export default App;

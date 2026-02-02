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
    <div className="app-container" style={{ position: 'relative' }}>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: isDarkMode ? '#e94560' : '#FFF',
          color: isDarkMode ? '#FFF' : '#222',
          border: isDarkMode ? 'none' : '1px solid #ddd',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      {step === 'start' && <StartScreen onStart={handleStart} isDarkMode={isDarkMode} />}

      {step === 'question' && (
        <QuestionScreen
          questionIndex={questionIndex}
          onAnswer={handleAnswer}
          isDarkMode={isDarkMode}
        />
      )}

      {step === 'result' && (
        <ResultScreen
          mbti={calculateMBTI()}
          userName={userName}
          onReset={handleReset}
          onCollection={handleCollection}
          isDarkMode={isDarkMode}
        />
      )}

      {step === 'collection' && (
        <CollectionScreen onBack={handleBackToResult} isDarkMode={isDarkMode} />
      )}

      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        color: currentTheme.text,
        fontSize: '1rem',
        fontFamily: '"Gaegu", sans-serif',
        background: currentTheme.footerBackground,
        width: '100%',
        transition: 'all 0.5s ease'
      }}>
        제작자: hoyakdh@icloud.com
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { questions } from './data/questions';

function App() {
  const [step, setStep] = useState('start'); // start, question, result
  const [userName, setUserName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  });

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

  return (
    <div className="app-container">
      {step === 'start' && <StartScreen onStart={handleStart} />}

      {step === 'question' && (
        <QuestionScreen
          questionIndex={questionIndex}
          onAnswer={handleAnswer}
        />
      )}

      {step === 'result' && (
        <ResultScreen
          mbti={calculateMBTI()}
          userName={userName}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;

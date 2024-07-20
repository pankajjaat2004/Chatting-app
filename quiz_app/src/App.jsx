import React, { useEffect, useState } from 'react';
import './App.css';
import Start from './components/Start';
import QuizSelector from './components/QuizSelector';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuizSelector, setQuizType]=useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // const quizType='quiz';

  // const setQuizJson=(quizIs)=>{
  //   quizType=quizIs;

  // }

  // Load JSON Data
  const setQuizJson=(quizType,event) => {
    event.target.classList.add('bg-success');

    fetch(`${quizType}.json`)
      .then(res => res.json())
      .then(data => setQuizs(data))
  };

  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex])

   //start Quiz type selector
   const startQuizSelector = () => {
    setShowStart(false);
    setQuizType(true);
  }

  // Start Quiz
  const startQuiz = () => {
    setQuizType(false);
    setShowQuiz(true);
  }

 

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 1);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(false);
    setQuizType(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  return (
    <>
      {/* Welcome Page */}
      <Start
        startQuizSelector={startQuizSelector}
        showStart={showStart}
      />

      {/* Quiz Selector */}
      <QuizSelector
        startQuiz={startQuiz}
        setQuizJson={setQuizJson}
        showQuizSelector={showQuizSelector}
      />

      {/* Quiz Page */}
      <Quiz
        showQuiz={showQuiz}
        question={question}
        quizs={quizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />

      {/* Result Page */}
      <Result
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        startOver={startOver} />
    </>
  );
}

export default App;

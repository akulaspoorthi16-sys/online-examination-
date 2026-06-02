import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const questions = [
    {
      question: "React is developed by?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      answer: "Facebook",
    },
    {
      question: "Node.js runtime is built on?",
      options: ["Java", "V8 Engine", "Python", "PHP"],
      answer: "V8 Engine",
    },
  ];

  const [timeLeft, setTimeLeft] = useState(300);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswer = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const submitExam = () => {
    let marks = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        marks++;
      }
    });

    setScore(marks);
    setSubmitted(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="container">
      <h1>Online Examination System</h1>

      {!submitted ? (
        <>
          <div className="timer">
            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>

          {questions.map((q, index) => (
            <div className="card" key={index}>
              <h3>{q.question}</h3>

              {q.options.map((option, i) => (
                <label key={i} className="option">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswer(index, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}

          <button onClick={submitExam} className="submit-btn">
            Submit Exam
          </button>
        </>
      ) : (
        <div className="result">
          <h2>Exam Submitted Successfully</h2>
          <p>
            Score: {score} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
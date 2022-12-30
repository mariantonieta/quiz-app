import questions from "../../questions.js"
import { useState, useEffect } from "react";
import './styles.css'

function CardQuiz() {
  const [actualQuestion, setActualQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
  
    if (isCorrect) setScore(score + 1);
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
  
    setTimeout(() => {
      if (actualQuestion === questions.length - 1) {
        setIsFinished(true);
      } else {
        setActualQuestion(actualQuestion + 1);
        setTime(10);
      }
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) setTime((prev) => prev - 1);
      if (time === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  if (isFinished)
    return (
      <main className="container">
        <div className="game-over">
          <span>
            {" "}
            Obtuviste {score} de {questions.length}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Volver a jugar
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setActualQuestion(0);
            }}
          >
            Ver las respuestas
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className="container">
        <div className="ctn-left">
          <div className="question-number">
            <span> Pregunta {actualQuestion + 1} de</span> {questions.length}
          </div>
          <div className="title-question">
            {questions[actualQuestion].title}
          </div>
          <div>
            {
              questions[actualQuestion].options.filter(
                (opcion) => opcion.isCorrect
              )[0].textores
            }
          </div>
          <button
            onClick={() => {
              if (actualQuestion === questions.length - 1) {
                window.location.href = "/";
              } else {
                setActualQuestion(actualQuestion + 1);
              }
            }}
          >
            {actualQuestion === questions.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
    <main className="container">
      <div className="ctn-left">
        <div className="question-number">
          <span> Pregunta {actualQuestion + 1} de</span> {questions.length}
        </div>
        <div className="title-question">
          {questions[actualQuestion].title}
        </div>
        <div>
          {!areDisabled ? (
            <span className="time">
              Tiempo restante: {time}{" "}
            </span>
          ) : (
            <button
              onClick={() => {
                setTime(10);
                setAreDisabled(false);
                if (actualQuestion === questions.length - 1) {
                  setIsFinished(true);
                } else {
                  setActualQuestion(actualQuestion + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="ctn-right">
        {questions[actualQuestion].options.map((res) => (
          <button
            disabled={areDisabled}
            key={res.textores}
            onClick={(e) => handleAnswerSubmit(res.isCorrect, e)}
          >
            {res.textResp}
          </button>
        ))}
      </div>
    </main>
  );
}

export default CardQuiz;
import React from "react";





const quizzes = [
  {
    question: "What is 8 + 5?",
    options: ["10", "12", "13", "14"],
    answer: "13"
  },
  {
    question: "Solve for x: 2x + 3 = 7",
    options: ["1", "2", "3", "4"],
    answer: "2"
  }
];



function MathQuiz() {
  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
    
    
    
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
        Maths Quiz
      </h1>

      {quizzes.map((quiz, index) => (
        <div key={index} style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: "bold" }}>{index + 1}. {quiz.question}</p>
          <ul style={{ paddingLeft: "1.5rem" }}>
            {quiz.options.map((option, idx) => (
              <li key={idx} style={{ marginBottom: "0.4rem" }}>🔘 {option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MathQuiz;

import React, { useState } from "react";
import "./StudentTest.css";

const StudentTest = () => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: "q1",
      text: "How often do you find it hard to stay focused on a task?",
      options: ["Never", "Sometimes", "Often", "Always"]
    },
    {
      id: "q2",
      text: "Do you find yourself feeling anxious in a school setting?",
      options: ["No", "A little", "Moderately", "Very much"]
    },
    {
      id: "q3",
      text: "How do you prefer to learn?",
      options: ["Watching videos", "Listening", "Reading", "Hands-on"]
    },
    {
      id: "q4",
      text: "How do you usually behave around new people?",
      options: ["Shy", "Talkative", "Neutral", "Avoidant"]
    }
  ];

  const handleChange = (questionId, answer) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted responses:", responses);
    setSubmitted(true);
  };

  return (
    <div className="student-test-wrapper">
      <div className="test-card">
        <h1>Student Self-Assessment</h1>
        <p>Please answer the following questions honestly. Your psychiatrist will use this information to better support you.</p>

        {submitted ? (
          <div className="thank-you">
            <h2>✅ Thank you!</h2>
            <p>Your responses have been recorded.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="test-form">
            {questions.map((q) => (
              <div className="test-question" key={q.id}>
                <label>{q.text}</label>
                <div className="test-options">
                  {q.options.map((opt) => (
                    <label key={opt} className="option-label">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        onChange={() => handleChange(q.id, opt)}
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentTest;



import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Lessons.css";

function Lessons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lessons, setLessons] = useState([]);
  const navigate =useNavigate();
  const isAuthenticated = localStorage.getItem("isLoggedIn") ==="true";

     
    
  useEffect(() => {
    if (!isAuthenticated){
      navigate("/login");
    }else{
    fetch("http://localhost:5000/api/lessons")
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
      })
      .catch((err) => console.error("Error fetching lessons:", err));
    }
  }, [isAuthenticated,navigate]);

  const dummyLessons = [
    {
      title: "Maths",
      description: "Improve your mathematical skills",
      className: "math-card",
    },
    {
      title: "English",
      description: "Improve your reading and writing skills",
      className: "lessons-card",
    },
    {
      title: "Kiswahili",
      description: "Zungumza na kuongea",
      className: "kiswahili-card",
    },
    {
      title: "Creative art",
      description: "Practice your creative skills",
      className: "lessons-card",
    },
    {
      title: "Practicals",
      description: "Practice with quizzes and puzzles",
      className: "lessons-card",
    },
  ];

  const filteredLessons = (lessons.length > 0 ? lessons : dummyLessons).filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lessons-container">
      <div className="lesson-grid">
        {filteredLessons.map((lesson, index) => (
          <div className={lesson.className || "lessons-card"} key={index}>
            <h1 style={{ color: "white", fontWeight: "bold" }}>
              {lesson.title}
            </h1>
            <p style={{ fontSize: "1rem", color: "white" }}>
              {lesson.description}
            </p>
            <Link to={`/lesson/${lesson.title}`}>
              <button
                style={{
                  background: "blue",
                  color: "white",
                  padding: "20px 15px",
                  margin: "10px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Start learning
              </button>
            </Link>
          </div>
        ))}
        {filteredLessons.length === 0 && (
          <p
            style={{
              color: "blue",
              fontSize: "2rem",
              textAlign: "center",
              width: "100%",
              fontWeight: "bolder",
            }}
          >
          <strong>  No lessons found for "{searchTerm}"</strong>
          </p>
        )}
      </div>

      <div className="search">
        <input
          placeholder="Search subjects for your level of study"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "20px 70px",
            margin: "20px",
            background: "hsla(0, 0.00%, 100.00%, 0.96)",
            borderRadius: "20px",
            color: "black",
            width: "1000px",
          }}
        />
        <button
          className="lesson-btn"
          style={{
            background: "hsla(237, 87.80%, 35.30%, 0.75)",
            border: "none",
            borderRadius: "20px",
            color: "white",
            padding: "10px 15px",
            cursor: "pointer",
            left:'-113px'
          }}
        >
          search
        </button>
      </div>

      <div className="footer-container-lessons">
        <footer className="footer-lessons">
          <p>
            If you can't find the specific lesson you want to learn, go to our
            lesson details page to surf more...
          </p>
          <button
            style={{
              background: "black",
              color: "white",
              padding: "10px 10px",
              border: "none",
            }}
          >
            X
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Lessons;



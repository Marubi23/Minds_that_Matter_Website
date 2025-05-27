import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import b2 from '../assets/error.JPG';

const lessonData = {
  Maths: {
    title: "Maths",
    description: "This lesson helps you improve your mathematical skills.",
    video: "/videos/math anime.mp4",
    topics: ["Basic Arithmetic", "Algebra", "Geometry", "Problem-solving skills"],
  },
  English: {
    title: "English",
    description: "Learn reading, writing, and grammar in English.",
    topics: ["Grammar", "Vocabulary", "Writing Skills", "Reading Comprehension"],
  },
  Kiswahili: {
    title: "Kiswahili",
    description: "Zoea kuandika na kuzungumza Kiswahili fasaha.",
    topics: ["sarufi", "Muundo wa sentensi", "tamthilia", "kuzungumza"],
  },
  "Creative art": {
    title: "Creative art",
    description: "Practice your creativity with music, dance, and art.",
    topics: ["Drawing Techniques", "Music Theory", "Dance Choreography", "Sculpture"],
  },
  Practicals: {
    title: "Practicals",
    description: "Do hands-on activities, quizzes and puzzles.",
    topics: ["Lab Experiments", "Computer Science Projects", "Art Projects"],
  },
};

function LessonDetails() {
  const { lessonTitle } = useParams();
  const decodedTitle = decodeURIComponent(lessonTitle);

  // Match the lesson title case-insensitively
  const lesson = Object.values(lessonData).find(
    (l) => l.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleCompletion = () => {
    let progress = JSON.parse(localStorage.getItem("progress")) || {};
    progress[decodedTitle] = "completed";
    localStorage.setItem("progress", JSON.stringify(progress));
    setIsCompleted(true);
  };

  useEffect(() => {
    if (!lesson) return;
    let progress = JSON.parse(localStorage.getItem("progress")) || {};
    if (progress[decodedTitle] === "completed") {
      setIsCompleted(true);
    }
  }, [decodedTitle, lesson]);

  if (!lesson) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <img style={{ height: '100px', width: '130px' }} src={b2} alt="error-pic" />
        <h2 style={{ color: "red", fontSize: '1rem' }}>
          Lesson "{decodedTitle}" not found!
        </h2>
        <p style={{ color: 'black', fontFamily: "monospace" }}>
          If you get this message, it means you have not selected any subject to start learning! Please go back to the homepage and click the Get Started button.
        </p>
        <Link to="/login">
          <button style={{
            padding: '10px 15px',
            color: 'white',
            background: 'blue',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px'
          }}>
            Click here to solve this
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div style={{
        padding: "2rem",
        background: 'hsla(0, 95.70%, 45.30%, 0.45)',
        minHeight: "80vh",
        borderRadius: '10px',
        paddingTop: '0px'
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          color: "white",
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          {lesson.title}
        </h1>
        <p style={{
          fontSize: "1.2rem",
          marginTop: "1rem",
          color: 'black',
          fontWeight: '500'
        }}>
          {lesson.description}
        </p>

        {lesson.topics && (
          <ul style={{
            color: "black",
            fontWeight: "500",
            fontSize: "1rem",
            marginTop: "1rem",
            lineHeight: "1.8"
          }}>
            {lesson.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        )}
      </div>

      {lesson.video && (
        <div style={{ padding: '1rem', marginTop: '1rem', textAlign: 'center' }}>
          <video
            width="80%"
            height='500px'
            controls
            playsInline
            muted
            onEnded={handleCompletion}
            poster="/thumbnails/thumb.JPG"
            style={{ borderRadius: '10px' }}
          >
            <source src={lesson.video} type="video/mp4" />
          </video>

          {!isCompleted && (
            <button
              onClick={handleCompletion}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Mark as Completed
            </button>
          )}

          {decodedTitle.toLowerCase() === "maths" && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a
                href="/quizzes/maths"
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "1.1rem"
                }}
              >
                Do a Quiz
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LessonDetails;



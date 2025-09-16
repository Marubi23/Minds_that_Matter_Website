import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Data.css';
import MTMInfoCard from "../Components/MTMInfoCard";

function Data({ setStudent }) {
  const navigate = useNavigate();
  const [student, setLocalStudent] = useState({
    pin: '',
    avatar: '',
  });

  const avatars = [
    { label: '', url: '/avatars/cat.jpeg' },
    { label: '', url: '/avatars/duck.jpeg' },
    { label: '', url: '/avatars/panda.jpeg' },
    { label: '', url: '/avatars/jokey.jpeg' },
  ];

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (student.pin.length !== 4) {
      alert("PIN must be exactly 4 digits");
      return;
    }
    if (!student.avatar) {
      alert("Please select an avatar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/records/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await response.json();

      if (response.ok && data) {
        localStorage.setItem("student", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", "student");
        setStudent(data);
        navigate("/resources");
      } else {
        alert("Student not found. Please take the test.");
        localStorage.setItem("pendingStudent", JSON.stringify(student));
        navigate("/test");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="data-background">
        
        {/* ✅ Full login form for desktop */}
        <div className="formlogin-container full-login">
          <h2>Student Login</h2>

          <form onSubmit={handleStudentSubmit}>
            <div className="avatar-select">
              <p>Select Your Avatar:</p>
              <div className="avatar-options">
                {avatars.map((av) => (
                  <div
                    key={av.url}
                    className={`avatar-box ${student.avatar === av.url ? 'selected' : ''}`}
                    onClick={() => setLocalStudent({ ...student, avatar: av.url })}
                  >
                    <img src={av.url} alt="avatar" />
                    <p>{av.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <input
              type="password"
              className="login-input"
              placeholder="Enter 4-digit PIN"
              value={student.pin}
              maxLength="4"
              pattern="\d*"
              onChange={(e) => setLocalStudent({ ...student, pin: e.target.value })}
              required
            />

            <button className="login-button" type="submit">LOGIN</button>
          </form>

          <div className="new-student-section">
            <p>New Student?</p>
            <button className="new-student-button" onClick={() => navigate('/test')}>
              Take The Entry Test
            </button>
          </div>
        </div>

        {/* ✅ Simple login button for small screens */}
        <div className="simple-login">
          <button className="simple-login-button" onClick={() => navigate('/student-login')}>
            Student Login
          </button>
          <div style={{ marginTop: '20px' }}>
            <MTMInfoCard />
          </div>
        </div>

        {/* ✅ Logo card for desktop */}
        <div className="logo-company full-login">
          <MTMInfoCard />
        </div>
      </div>
    </div>
  );
}

export default Data;

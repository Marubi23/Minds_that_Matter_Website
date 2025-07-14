import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Data.css';
import logo from '../assets/logo.png';

function Data({ setStudent }) {
  const navigate = useNavigate();
  const [student, setLocalStudent] = useState({ name: '', grade: '', id: '' });

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('student', JSON.stringify(student));
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem('role', 'student');
    setStudent(student);
    navigate('/test');
  };

  return (
    <div className="login-container">
  

      <div className="data-background">
        <div className="formlogin-container">
          <h2>Students Access</h2>
          <div style={{ marginBottom: '1rem' }}>
  <Link to="/">
    <button className="homedata-button">← Back to Home</button>
  </Link>
</div>

          <form onSubmit={handleStudentSubmit}>
            <input
              type="text"
              className="login-input"
              placeholder="First Name"
              value={student.name}
              onChange={(e) => setLocalStudent({ ...student, name: e.target.value })}
              required
            />
            <input
              type="number"
              className="login-input"
              placeholder="Grade/Class"
              value={student.grade}
              min={0}
              max={10}
              onChange={(e) => setLocalStudent({ ...student, grade: e.target.value })}
              required
            />
            <input
              type="number"
              className="login-input"
              placeholder="Student Age (Compulsory)"
              value={student.id}
              min={7}
              max={18}
              onChange={(e) => setLocalStudent({ ...student, id: e.target.value })}
              required
            />
            <button className="login-button" type="submit">Take Test</button>
          </form>
        </div>

        <div className="logo-company">
          <img src={logo} alt="company-logo" />
          <div className="portal">
            <Link to="/parent">
              <button>Parental Access</button>
            </Link>
            <Link to="/teacher-login">
              <button>Psychiatrist Access</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './Progress.css';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate,Link } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Progress() {
  const [progressData, setProgressData] = useState({});
  const [completedCount, setCompletedCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const parentAuthentication=localStorage.getItem("isAuthenticated")==="true";
  const userRole=localStorage.getItem("userRole");
  const navigate =useNavigate();



  useEffect(()=>{
    if (!parentAuthentication || userRole !=="parent"){
      navigate('/parent');

      
    }
  },[parentAuthentication,userRole,navigate]);

  
  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem("progress")) || {};
    setProgressData(storedProgress);
    setCompletedCount(Object.values(storedProgress).filter(status => status === "completed").length);
    setTotalLessons(Object.keys(storedProgress).length);
  }, []);

  const handleLogout =()=>{
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate('/parent');
  }

  
  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Lesson Completion',
        data: [completedCount, totalLessons - completedCount],
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderRadius: 10
      },
    ],
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Student Progress</h1>
      <button className='parent-logout-btn' onClick={handleLogout}>Logout</button>
      <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
        {completedCount} of {totalLessons} lessons completed.
      </p>

    
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Lesson Completion Status' },
          },
        }}
      />

      
      <div style={{ marginTop: '2rem' }}>
        <Link to="/lessons">
          <button style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}>
            Back to Lessons
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Progress;


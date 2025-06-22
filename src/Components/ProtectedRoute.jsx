import { Navigate, useNavigate } from 'react-router-dom';
import errorGif from '../assets/errorpage.gif';
import { Ban } from 'lucide-react';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.overlay}>
          <div style={styles.iconTitle}>
            <Ban size={40} color="#dc2626" />
            <h2 style={styles.title}>Access Denied</h2>
          </div>
          <p style={styles.message}>You must be logged in as a student or parent to view this page.</p>
          
          <button onClick={() => navigate('/login')} style={styles.button}>Login</button>
   
        
        
        </div>
  
      
      </div>
    );
  }

  return children;
};

const styles = {
  container: {
    backgroundImage: `url(${errorGif})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    maxWidth: '600px',
  },
  iconTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    gap: '10px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1e293b',
  },
  message: {
    fontSize: '18px',
    color: 'black',
    marginBottom: '24px',
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
 
};

export default ProtectedRoute;

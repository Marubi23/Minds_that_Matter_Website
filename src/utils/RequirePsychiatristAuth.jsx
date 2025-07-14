import { Navigate } from 'react-router-dom';

const RequirePsychiatristAuth = ({ children }) => {
  const token = localStorage.getItem('psychiatristToken');
  return token ? children : <Navigate to="/psychiatrist-login" />;
};

export default RequirePsychiatristAuth;

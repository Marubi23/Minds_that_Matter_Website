import { useEffect, useState } from 'react';
import StudentResources from '../Components/StudentResources';
import ParentResources from '../Components/ParentResources';

const Resources = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  if (!role) return <div>Loading resources...</div>;

  if (role === 'student') return <StudentResources />;
  if (role === 'parent') return <ParentResources />;

  return <div>Unauthorized access.</div>;
};

export default Resources;

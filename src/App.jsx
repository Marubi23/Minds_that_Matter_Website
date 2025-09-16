import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './pages/Navbar.jsx';
import StudentResources from './pages/StudentResources.jsx';
import ParentResources from './pages/ParentResources.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import RequirePsychiatristAuth from './utils/RequirePsychiatristAuth.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CompleteProfile from './pages/CompleteProfile.jsx';
import Progress from './pages/Progress.jsx';
import Video from './pages/Video.jsx';
import Data from './pages/Data.jsx';
import Parent from './pages/Parent.jsx';
import Sign from './pages/Sign.jsx';
import Success from './pages/Success.jsx';
import CreateRoom from './pages/CreateRoom.jsx';
import PsychiatristLogin from './pages/PsychiatristLogin.jsx';
import PsychiatristDashboard from './pages/PsychiatristDashboard.jsx';
import AttentionMonitor from './components/AttentionMonitor.jsx';
import Records from './pages/Records.jsx';
import Settings from './components/Settings.jsx';
import Notifications from './pages/Notifications.jsx';
import ParentDashboard from './components/ParentDashboard.jsx';
import Resources from './pages/Resources.jsx';
import PinDisplay from './components/PinDisplay.jsx';
import OfflinePayment from './components/OfflinePayment.jsx';

import './App.css';

function App() {
  const [student, setStudent] = useState(null);
  const [parent, setParent] = useState(null);

  useEffect(() => {
    const safeParse = (key) => {
      try {
        const value = localStorage.getItem(key);
        if (!value || value === 'undefined' || value === 'null') return null;
        return JSON.parse(value);
      } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        return null;
      }
    };

    setStudent(safeParse('student'));
    setParent(safeParse('parent'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    localStorage.removeItem('parent');
    localStorage.removeItem('token');
    localStorage.removeItem('parentToken');
    localStorage.removeItem('role');
    setStudent(null);
    setParent(null);
  };

  return (
    <div className="main">
      <Navbar
        student={student}
        parent={parent}
        setStudent={setStudent}
        setParent={setParent}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<Records />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/videocall" element={<Video />} />
        <Route path="/test" element={<CompleteProfile />} />
        <Route path="/login" element={<Data setStudent={setStudent} />} />
        <Route path="/parent" element={<Parent setParent={setParent} />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/success" element={<Success />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/teacher-login" element={<PsychiatristLogin />} />
        <Route path="/monitor" element={<AttentionMonitor />} />
        <Route path="/student/resource" element={<StudentResources />} />
        <Route path="/parent/resource" element={<ParentResources />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/parent-dash" element={<ParentDashboard />} />
        <Route path="/pin" element={<PinDisplay />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/payment" element={<OfflinePayment />} />

        {/* Protected student route */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute isAuthenticated={!!student}>
              <Resources />
            </ProtectedRoute>
          }
        />

        {/* Protected psychiatrist route */}
        <Route
          path="/dashboard"
          element={
            <RequirePsychiatristAuth>
              <PsychiatristDashboard />
            </RequirePsychiatristAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

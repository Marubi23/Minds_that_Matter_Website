import { useEffect,useState } from 'react';
import Navbar from './Components/Navbar.jsx'
import StudentResources from './Components/StudentResources.jsx';
import ParentResources from './Components/ParentResources.jsx';
import  "./App.css";
import ProtectedRoute from './Components/ProtectedRoute.jsx'; 
import Resources from './pages/Resources.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx';
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
import AttentionMonitor from './Components/AttentionMonitor.jsx';
import Records from './pages/Records.jsx';
import Settings from './Components/Settings.jsx';
import Notifications from './pages/Notifications.jsx';
import RequirePsychiatristAuth from './utils/RequirePsychiatristAuth.jsx';
import ParentDashboard from './Components/ParentDashboard.jsx';






import { Routes,Route } from 'react-router-dom'

function App() {
  const [student,setStudent]= useState(null);



  useEffect(()=>{
    const storedStudent =localStorage.getItem('student');
    
    if(storedStudent){
      setStudent(JSON.parse(storedStudent));
    }

  },[]);
    return(
        <>
        <div className="main">
                  <Navbar student={student} setStudent={setStudent}/>
        
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/records' element={<Records/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/progress" element={<ParentDashboard />} />
          <Route path='/videocall' element={<Video/>}/>
          <Route path='/test' element={<CompleteProfile/>}/>
          <Route path='/login' element={<Data setStudent={setStudent} />} />
          <Route path='/parent'element={<Parent/>}/>
          <Route path='/sign'  element={<Sign/>}/>
          <Route path="/resources"element={<ProtectedRoute isAuthenticated={!!student}><Resources /></ProtectedRoute>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path="/createroom" element={<CreateRoom/>}/>
          <Route path='teacher-login' element={<PsychiatristLogin/>}/>
          <Route path='/dashboard' element={<RequirePsychiatristAuth><PsychiatristDashboard /></RequirePsychiatristAuth>}/>
          <Route path='/monitor' element={<AttentionMonitor/>}/>
          <Route path='/student/resource' element={<StudentResources/>}/>
          <Route path='/parent/resource' element={<ParentResources/>}/>
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />

        
        </Routes>
        
        
        </div>


        </>
       
    );
  
}
export default App;

import { useEffect,useState } from 'react';
import Navbar from './Components/Navbar.jsx'
import  "./App.css";
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx';
import StudentTest from './pages/StudentTest.jsx';
import Progress from './pages/Progress.jsx';
import Video from './pages/Video.jsx';
import Data from './pages/Data.jsx';
import Parent from './pages/Parent.jsx';
import Sign from './pages/Sign.jsx';
import Success from './pages/Success.jsx';
import CreateRoom from './pages/CreateRoom.jsx';
import TeacherLogin from './pages/TeacherLogin.jsx';
import PsychiatristDashboard from './pages/PsychiatristDashboard.jsx';
import AttentionMonitor from './Components/AttentionMonitor.jsx';

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
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/progress' element={<Progress/>}/>
          <Route path='/videocall' element={<Video/>}/>
          <Route path='/test' element={<StudentTest/>}/>
          <Route path='/login' element={<Data setStudent={setStudent} />} />
          <Route path='/parent'element={<Parent/>}/>
          <Route path='/sign'  element={<Sign/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path="/createroom" element={<CreateRoom/>}/>
          <Route path='/teacher-login' element={<TeacherLogin/>}/>
          <Route path='/dashboard' element={<PsychiatristDashboard/>}/>
          <Route path='/monitor' element={<AttentionMonitor/>}/>
        </Routes>
        
        
        </div>


        </>
       
    );
  
}
export default App;

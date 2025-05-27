import { useEffect,useState } from 'react';
import Navbar from './Components/Navbar.jsx'
import  "./App.css";
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx';
import Lessons from './pages/Lessons.jsx';
import LessonsDetails from './pages/LessonsDetails.jsx';
import Progress from './pages/Progress.jsx';
import Video from './pages/Video.jsx';
import MathQuiz from "./pages/MathQuiz";
import Data from './pages/Data.jsx';
import Parent from './pages/Parent.jsx';
import Sign from './pages/Sign.jsx';
import Success from './pages/Success.jsx';

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
        <Navbar student={student} setStudent={setStudent}/>
        <div className='container'>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/lessons' element={<Lessons/>}/>
          <Route path='/lessonsdetails' element={<LessonsDetails/>}/>
          <Route path='/progress' element={<Progress/>}/>
          <Route path='/videocall' element={<Video/>}/>
          <Route path="/lesson/:lessonTitle" element={<LessonsDetails />} />
          <Route path="/quizzes/maths" element={<MathQuiz />} />
          <Route path='/login' element={<Data setStudent={setStudent} />} />
          <Route path='/parent'element={<Parent/>}/>
          <Route path='/sign'  element={<Sign/>}/>
          <Route path='/success' element={<Success/>}/>
        
        


        </Routes>
        
        </div>

        </>
       
    );
  
}
export default App;

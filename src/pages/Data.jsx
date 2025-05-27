import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Data.css';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
 function Data({setStudent}){

 const navigate=useNavigate();
 const [student,setLocalStudent]=useState({name:'',grade:'',id:''});


const handleStudentSubmit=(e)=>{
    e.preventDefault();
    localStorage.setItem('student',JSON.stringify(student));
    localStorage.setItem("isLoggedIn",true);
    setStudent(student);
    navigate('/lessons');
};





 return(
    <div className="login-container">
        <button
  onClick={() => navigate('/')}
  className="floating-home-btn"
>
  Go Back to Homepage
</button>

       
        <div className="formlogin-container">
            <h2 style={{textAlign:'center',marginBottom:'40px'}}>Students Access</h2>
            <form onSubmit={handleStudentSubmit}>
                <input type="text" 
                className="login-input"
                placeholder="First Name"
                value={student.name}
                onChange={(e)=>setLocalStudent({...student,name:e.target.value })}
                required />
                <input type="number"
                className="login-input"
                min={0}
                max={10}
                placeholder="Grade/Class"
                value={student.grade}
                onChange={(e)=>setLocalStudent({...student,grade:e.target.value})}
                required />
                <input type="number"
                className="login-input"
                max={18}
                min={7}
                placeholder="Student Age (Compulsary)"
                value={student.id}
                onChange={(e)=>setLocalStudent({...student,id:e.target.value})} 
                required/>
                <button className="login-button" type="submit">Access Lessons</button>
            </form>
           
        </div>
      <div className="logo-company"> <img style={{height:'200px',width:'180px'}}  src={logo} alt="company-logo" />
      <Link to={'/parent'}><button style={{padding:'20px',background:'hsl(151, 93.60%, 51.00%)',color:'black',border:'none',borderRadius:'10px',cursor:'pointer',fontFamily:'verdana'}}>Parent Access Portal</button></Link>
      </div>
       
       

    </div>
 );


 }
 export default Data
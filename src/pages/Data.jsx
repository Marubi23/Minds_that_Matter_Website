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
    localStorage.setItem('role','student');
    setStudent(student);
    navigate('/test');
};





 return(
    <div className="login-container">
        <button
  onClick={() => navigate('/')}
  className="floating-home-btn"
>
◀Back  
</button>

       <div className="data-background">
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
                placeholder="Student Age (Compulsory)"
                value={student.id}
                onChange={(e)=>setLocalStudent({...student,id:e.target.value})} 
                required/>
                <button className="login-button" type="submit">Take Test</button>
            </form>
           
        </div>
      <div className="logo-company"> <img style={{height:'200px',width:'180px'}}  src={logo} alt="company-logo" />
      <div className="portal">
    <Link to={'/parent'}><button style={{padding:'20px',background:'hsl(151, 93.60%, 51.00%)',color:'black',border:'none',borderRadius:'10px',cursor:'pointer',fontFamily:'verdana'}}>Parental Access </button></Link>
      <Link to={'/teacher-login'}><button style={{padding:'20px',background:'hsl(272, 74.10%, 39.40%)',color:'white',border:'none',borderRadius:'10px',cursor:'pointer',fontFamily:'verdana'}}>Psychiatrist Access</button></Link>
      </div>
      </div>
      
       
       

    </div>
    </div>
        
 );


 }
 export default Data
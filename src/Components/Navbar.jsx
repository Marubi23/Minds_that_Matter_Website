import React,{useEffect,useState} from "react";
import logo from "../assets/logo.png";




import { Link, useNavigate } from "react-router-dom";

function Navbar({student,setStudent}) {
  const navigate = useNavigate();
  



  const handleLogout=()=>{
    localStorage.removeItem("student");
    localStorage.removeItem("isLoggedIn");
    setStudent(null);
    navigate("/login");
  };

  const handleGetStartedClick = () => {
    navigate("/login");  
  };


  return (
    <div className="navbar">
        <div className="logo-container">
      <img src={logo} alt="Logo"  style={{opacity:0.8,mixBlendMode:"screen", }}/>
      </div>
      <ul style={{cursor:'pointer'}}>
       <Link to='./'><li style={{color:'blue'}}>Home</li></Link>
       <Link to='./lessons'><li style={{color:'brown'}}>Lessons</li></Link>
       <Link to='./lessonsdetails'><li style={{color:'red'}}>LessonsDetails</li></Link>
       <Link to='./videocall'><li style={{color:'tomato'}}>Video</li></Link>
       <Link to='./progress'><li style={{color:'green'}}>Progress</li></Link>
       <Link to='./about'><li style={{color:'black'}}>About</li></Link>
      <Link to='./contact'><li style={{color:'orange'}}>Contact</li></Link>

        
      </ul>
      <div className="page-btn">
      <button onClick={handleGetStartedClick}>Get Started</button>
      </div>

      {student && (
        <div style={{position: "absolute",top: "10px",right: "20px",display: "flex",flexDirection:'column',alignItems: "center",gap: "10px"}}>
          <span style={{ fontWeight: "bold", color: "#333" }}>
            Hello {student.name}
          </span>
          <button
            onClick={handleLogout}
            style={{background: "crimson",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}>Logout</button>
        </div>
      )}

      
    
      
    </div>
  );
}

export default Navbar;

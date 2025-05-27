import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Parent.css';
import { Link } from 'react-router-dom';

function Parent() {
  const [parent, setParent] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleParentLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/parents/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parent),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userRole", "parent");
      navigate("/progress");
    } else {
      alert(data.message || "Invalid credentials");
    }
  }catch(error){
    console.error('login error:',error);
    alert('server error please try again later');
  }
}




  return (
    <div className="main" style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'center'}}>
    <div className="form-container" >
      <h2>Parent Login</h2>
      <form onSubmit={handleParentLogin}> 
        <input
          type="email"
          className="parent-input"
          placeholder="Email"
          value={parent.email}
          onChange={(e) => setParent({ ...parent, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="parent-input"
          placeholder="Password"
          value={parent.password}
          onChange={(e) => setParent({ ...parent, password: e.target.value })}
          required
        />
        <button className="parent-button" type="submit">
          View Child Progress
        </button>
       

      </form>
    </div>
    <Link to={'/sign'}><button  style={{padding:'20px',background:'hsla(301, 67.50%, 44.70%, 0.77)',color:'white',border:'none',borderRadius:'13px',cursor:'pointer'}}> Dont have an MTM account? Create an Account</button></Link>

    </div>
  );
}

export default Parent;

import { useNavigate } from "react-router-dom";

function Success(){
    const navigate=useNavigate();
    const handleProceed=()=>{
        navigate('/progress');

    }


return(

<div className="main">
    <div style={{display:'flex',flexDirection:'column'}} className="message">
        <h2>Congratulations you are now a MtM member</h2>
        <h2>Since you have an Account click the button to proceed to the login page</h2>
        <button onClick={handleProceed} style={{background:'hsl(191, 98.10%, 40.60%)',cursor:'pointer',border:'none',borderRadius:'10px',color:'white',fontWeight:'bold',padding:'13px'}}>Proceed</button>
    </div>
</div>



);



}
export default Success
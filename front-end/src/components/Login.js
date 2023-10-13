import React, { useEffect } from "react";
import './SignUp.css';
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = React.useState(''); 
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      //yha hm ye krna chah rhe h ki agar user login h tb bhi agar login ka url daal rha to hm check kr lenge ki agar login h phle se to usko root wale page pe redirect kr do login wale pe mt le jao.   
       if(auth){
        navigate('/');
       }
    },[])
    
    const handleLogin = async () => {
        console.warn(email, password);

        let result =   await fetch("http://localhost:5000/login", {
            method :'post',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email,password}),
            
        }) ;
        result = await result.json(); // fetch string m data return krta h usko json m convert krenge ar json() function bhi promise return krta h to await lga k hnadle krenge
        console.log(result);
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user));//local storage m jo store krte h usme json store nhi hota usko stringify krna pdta h 
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/"); // root pr redirect ho jaega because login hogya h 
        }else{
            alert("Please Enter Correct Details ");
        }

      
    }

    return (
        <div className = "signup">
            <h1>Login</h1>
            <input type = "text" className="input-field" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}></input>
            <input type = "password" className="input-field" placeholder="Enter Passsword" onChange = {(e)=>setPassword(e.target.value)}></input>
            <button onClick = {handleLogin} class = "signup-button" type = "button">Login</button>
        </div>
    )
}
export default Login;
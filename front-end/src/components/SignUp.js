import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// useNavigate is hook that is used to redirect 
import './SignUp.css'

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]  = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        //agar user sign in h pr tb bhi signin wale route ko daale to usko signup page nhi blki homepage dikhe
        if(auth)
        {
            navigate('/');
        }
    },[])

    const collectData = async()=>{
        console.log("before fetch")
        console.warn(name,email, password);
        const info ={
            name:name,
            email:email,
            password:password,
        }
        console.log(info)
        try{
        let  result  = await fetch("http://localhost:5000/signup",{
             method:'post',
             headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
              },
             body:JSON.stringify(info)
        });
        console.log("After fetch");
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        // server se jo data aya h usko browser local storeage m store krenge , page refresh kr do tbbhi data yha rhega browser close kr do tb bhi data yha rhega ,
        if(result){
            navigate("/");
            // agar result successfully aa jata h to root wale path pe redirect kr denge 
        }
    }catch(error){
        console.error("Error sending request:", error);
    }
       
    }
    return (
        <div className  = "signup">
            <h1>Sign Up</h1>
            <input  className='input-field'  type='text' value={name}  onChange ={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
            <input className='input-field' type='email'  value ={email} onChange ={(e)=>setEmail(e.target.value)} placeholder ='Enter Email'/>
            <input className='input-field'  type ='password' value ={password} onChange ={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            <input className='input-field' type ='password' value ={confirmPassword} onChange ={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password'/>
            <button onClick={collectData} className='signup-button'>SignUp</button>

        </div>
    )
}

export default SignUp;
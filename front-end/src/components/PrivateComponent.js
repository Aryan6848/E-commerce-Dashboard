import React from 'react';
import {Navigate,Outlet} from 'react-router-dom'

const PrivateComponent=()=>{
    const auth = localStorage.getItem('user');
    // agar user signed in hoga to browser k local storage m user ka data hoga to hm whi hm auth m le lenge 

   
    return  auth?<Outlet/>:<Navigate to = "/signup"></Navigate>
    // agr user signin h to auth m kuch hoga to usko jis component pe jana chahta h jane denge 
    // pr agar auth m kuch nhi h yani user signed in nhi h to usko redirect kr denge signup page pe  
}

export default PrivateComponent;


// other way to do above thing
// import React from 'react';
// import {useNavigate,Outlet} from 'react-router-dom'

// const PrivateComponent=()=>{
//     const auth = localStorage.getItem('user');
//     // agar user signed in hoga to browser k local storage m user ka data hoga to hm whi hm auth m le lenge 

//    const navigate = useNavigate();   
//     return  auth?<Outlet/>:navigate('/signUp');
//     // agr user signin h to auth m kuch hoga to usko jis component pe jana chahta h jane denge 
//     // pr agar auth m kuch nhi h yani user signed in nhi h to usko redirect kr denge signup page pe  
// }
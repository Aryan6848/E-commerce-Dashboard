import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // logut button pe click ho to browser k local storage m jo user ke signin hone data aya h usko clear kr denge ar phir signin wale page pe navigate kr denge
    navigate("/signup"); //jb bhi navigate chalega to use navigate wala component bhi pura re render hoga jisse ho skta h ki navigate hone k baad navigation bar m kuch change hua ho , isliye jb bhi navigate hhoga to ye render phir se chalega
  };
  return (
    <div class="nav">
     <div className="nav-container">
     <img src="https://images-workbench.99static.com/r0OfbFg93HtOAMhkMfJQtuijHkY=/99designs-contests-attachments/146/146217/attachment_146217662" className="nav-logo"></img>
      { auth?
      <ul class="nav-ul">
       
        <li><Link to="/">Product</Link></li>
        {/* anchor tag mt lagana usse pager refresh hota h  */}
        <li><Link to="/add">Add Product</Link></li>
        {/*  <li><Link to="/update">UpdateProduct</Link></li> */}
        <li><Link to="/profile">Profile</Link></li>
        <li class="nav-right"><Link onClick={logout} to="/logout">Logout({JSON.parse(auth).name})</Link></li>
       </ul>
      
        :
        <ul class="nav-ul nav-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
        </ul>
        
        
    }
    </div>
    </div>
  );
};
export default Nav;

import React, { useEffect } from "react";
import './SignUp.css'
import {json, useParams,useNavigate} from 'react-router-dom'


const UpdateProduct = ()=>{
      
    const [name,setName] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company,setCompany] = React.useState("");
    const params = useParams();

    const navigate = useNavigate();
    // isko hme ek hi bar call krna h jb page hamara load ho uskeliye useEffect hook use krenge
    useEffect(()=>{
        getProductDetails();
    },[])
    
    const getProductDetails = async () =>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        //prefilling data
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const handleUpdateProduct =async () => {
        console.warn(name,price,company,category);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            }
        });
        result = await result.json();
        if(result){
            navigate('/'); //update krne k baad product list wale page pe redirect kr dega 
        }
    } 

    return (
        <div className="product">
            <h1>update product</h1>
            <input className="input-field" type="text" placeholder="Enter product name" value= {name} onChange = {(e)=>{setName(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter category" value = {category} onChange={(e)=>{setCategory(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter company"  value ={company} onChange={(e)=>{setCompany(e.target.value)}}></input>
            <button className="addProductButton" onClick={handleUpdateProduct}>Update Products</button>
        </div>
    )
}

export default UpdateProduct;

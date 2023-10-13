import React from "react";
import './SignUp.css'
const AddProduct = ()=>{
      
    const [name,setName] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company,setCompany] = React.useState("");
   
  

    const handleAddProduct =async() => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
         
         if(!name || !price || !category || !company){
            alert('Enter valid details');
            return false;
         }
        console.log("before fetch");
        const data = {
            name:name,
            price:price,
            category:category,
            company:company,
            userId:userId,
        }

        try{
        let result= await fetch("http://localhost:5000/add-product",{
        method:'post',
        headers:{
          'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify(data),
      }) ;
      
      console.log("After fetch");
      result = await result.json();
    }catch(error){
       console.error("Error sending Request:", error);
    }

    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
      
    } 

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="input-field" type="text" placeholder="Enter product name" value= {name} onChange = {(e)=>{setName(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter category" value = {category} onChange={(e)=>{setCategory(e.target.value)}}></input>
            <input className="input-field" type="text" placeholder="Enter company"  value ={company} onChange={(e)=>{setCompany(e.target.value)}}></input>
            <button className="addProductButton" onClick={handleAddProduct}>Add Products</button>
        </div>
    )
}

export default AddProduct;

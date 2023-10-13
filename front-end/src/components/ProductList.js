import React , {useState, useEffect} from "react";
import './ProductList.css';
import { Link } from "react-router-dom";

const ProductList = () =>{
    const [products, setProducts]=useState([]);
    

    useEffect(()=>{
        getProducts();
    },[])
    const getProducts =async () =>{
      let result = await fetch("http://localhost:5000/products",{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }); //fetch promise return krta h
      
      result = await result.json(); // json() ye bhi promise return krta h 
      setProducts(result);
    }

    const deleteProduct= async (id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if(result){
            
            getProducts(); 
            // delete hone k badd sare products ko phir se get krega to jo delete ho chuki h wo chli jaegi 
        }

    }
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`, {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        
        result = await result.json();
        if(result){
            setProducts(result);
        }
    }else{
        //agar jaise hi input box se sb earse kroge to sare products aa jane chahiye pr nhi ayenge to usko handle krne ke liye
        //ye kiye h ki agar key m kuch h to wo chle agar key m kuch nhi h to sare products aa jae .
        getProducts();
    }

    }


    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-product-box" type = "text" placeholder = 'Search Product' onChange={searchHandle}></input>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Companay</li>
                <li>Operation</li>
            </ul>
            {
                products.map( (item,index) =>
                    <ul key = {item._id}> 
                    {/* key m item ki id aa jaegi */}
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li>
                        <button className="delete-button" onClick = {()=> deleteProduct(item._id)}>Delete</button>
                        
                        <Link to ={"/update/" + item._id}><button className="update-button" >Update</button></Link>
                    </li>
                </ul>
                )
            }
        </div>
    )
}

export default ProductList;
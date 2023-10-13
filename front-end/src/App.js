import Nav from './components/Nav';
import './App.css';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        
        {/* jin jin routes ko private banana h usko iske andar rkh de yani jb tk user signed in na ho in cheejo ko access na kr pae  */}
        <Route element = {<PrivateComponent/>}>
          <Route path="/" element ={<ProductList/>}/>
          <Route path="/add" element ={<AddProduct/>}/>
          <Route path="/update/:id" element ={<UpdateProduct/>}/>
          <Route path="/logout" element ={<h1>Logout Component</h1>}/>
          <Route path="/profile" element ={<h1>Profile Component</h1>}/>
        </Route> 
        
        <Route path = "/signup" element ={<SignUp/>} />
        <Route path = "/login"  element ={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer /> 
      {/* iske anadar routing lga rhe ho to browserRouter k anadar rkho   */}
      
    </div>
  );
}

export default App;

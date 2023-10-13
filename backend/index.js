const express = require('express'); // Express.js for creating a web server
const cors = require("cors");// CORS middleware for handling cross-origin requests
require('./db/config');  // Assuming this line sets up your database connection
const User = require("./db/User") // Importing the User model
const Product = require ('./db/Product')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';


const app =express();  // Create an Express application


app.use(express.json());  // Parse JSON request bodies
app.use(cors({ origin: 'http://localhost:3000', // Allow requests from this origin (your React frontend)
credentials: true,}));  // Enable credentials (like cookies and headers) to be sent
app.use(express.urlencoded({extended:true}));  // Parse URL-encoded request bodies




// Define a POST route for handling sign-up requests
app.post('/signup', async(req,resp)=>{
    try{
    // Create a new User instance based on the data in the request body
    let user = new User(req.body);
    // Save the user to the database
    let result = await user.save();
        
     delete result.password;
    console.log(req.body);
    // Send a response with the result of the user save operation
    Jwt.sign({result},jwtKey,{expiresIn: '2h'},(err,token)=>{
        if(err){ 
            resp.send({result:"Smething went wrong Please try after sometime"})
        }
        resp.send({result,auth: token})
    })
    }catch(error){
        console.error("Error in signup route:", error);
    resp.status(500).send("Internal Server Error");
    }
});




app.post('/login', async(req, resp)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        console.log(user);
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn: '2h'},(err,token)=>{
                if(err){
                    resp.send({result:"Smething went wrong Please try after sometime"})
                }
                resp.send({user,auth: token})
            })
        }
        else{
            resp.send({result:'No user found'})
        }
    }else{
        resp.send({result:'No User Found'})
    }
})




app.post("/add-product", verifyToken, async(req,resp)=>{
    console.log("add product chl gaya");
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})


//jb bhi database se data get krna h to get route ka use krenge .
app.get("/products",verifyToken, async(req,resp)=>{
     let products = await Product.find(); // sara data return kr dega , ar ye promise return krega isliye isk handle krne ke liye async await ka use krenge 
     
     if(products.length > 0){
        resp.send(products);
     }else{
        resp.send({result:"No Products found"});
     }


})


app.delete("/product/:id",verifyToken,  async(req,resp)=>{ 
//   data databse se get krne k liye get method use krte h data database m save krne k liye post method use krte h , data database se delete krne k liye delete method ka use krte h
   console.log("delete chala ");
   const result =await Product.deleteOne({_id:req.params.id});
   resp.send(result); 
});


//interview question 2 api k routes same honge to dikkat hogi ? see delete and ye wale dono ka route same h ? Answer: dikkat tb hogi jb method bhi same hoga wrna nhi hogi because 
// frontend m fetch function se hi to ye api call krenge to usme method bhi to dete h 

//ye pi tb call hogi jb update wale component ke update Product wale button ko click kiye h frontend pe ar hme database se data get krna h according to this id isliye get method use krenge
app.get("/product/:id", verifyToken, async (req,resp) =>{
    console.log("update chala ")
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No record found"});
    }

}) 


app.get("/search/:key", verifyToken,async(req,resp)=>{
    let result = await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {company:{$regex:req.params.key}},
                {category:{$regex:req.params.key}}
            ]
        }
    );
    console.log(result);
    resp.send(result);
})





// update krne ke liye put method banate h 
app.put("/product/:id",verifyToken,  async (req,resp)=>{
    console.log("update chala");
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result)

     
}
)


function verifyToken(req,resp,next){
  let token = req.headers['authorization'];
  console.warn("token", token);
  if(token){
    token = token.split(' ')[1];
    Jwt.verify(token,jwtKey, (err,valid)=>{
      if(err){
            resp.status(401).send({result:"Please provide valid token"});
            // 401 tb bhejte h jb invalid ho
      }else{
         next(); // jis api se call hua h us api pe le jaega 
      } 
    })
  }else{
       resp.status(403).send({result:"Please Add token with header"})
    //    403 tb bhejte h jb ho hi na 
  }
  
}


// Start the Express server and listen on port 5000
app.listen(5000);
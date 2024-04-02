
const express = require("express");
const {connect} = require("mongoose");
const {join} = require("path");

const{PORT , MONGODB_URL} = require("./config")

const noteRoute = require("./routes/noteRoute")
const {engine} = require("express-handlebars")

const NOTE_SCHEMA = require("./models/Note")

const methodOverride = require("method-override");

const app = express();

//!                                    database connect

//?========================================= Connect DATABASE Starts Here =====================================================================
let connectDB = async()=>{
    
   try{
    await connect(MONGODB_URL);
    console.log('database is connected')
   }
   catch(err){
    console.log(err)
   }
}

connectDB()
//? ====================================== Connect DATABASE Ends Here =====================================================================


//? ======================================= Middleware Sections starts here =======================================

app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.use(express.urlencoded({extended:true}))
app.use(express.static(join(__dirname, "public")))
app.use(methodOverride("_method"));

//? ======================================= Middleware Sections ends here =======================================

//!  =============================== handlebars helpers==================================

app.get("/", async(req,res)=>{
    let payload = await NOTE_SCHEMA.find({}).lean();
    res.render("home", {title: "HOME PAGE", payload})
})


// app.get("/",(req,res)=>{
//     res.render("home", {title :"home page"})
// })


//!                                    call router level middleware

 app.use("/note",noteRoute)


//!                                       Listen A Port 


app.listen(PORT, err=>{
    if(err) throw err;

    console.log('app is running on port 5000')
})

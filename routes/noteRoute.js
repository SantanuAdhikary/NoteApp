const {Router }  = require("express");
const NOTE_SCHEMA = require("../models/Note")

let router = Router();

//! HTTP Mehotd => GET public access 

router.get("/create-note",(req,res)=>{
    res.render("notes/create-note", {title:"create note"})
})

router.get("/:id", async(req,res)=>{
    let payload = await NOTE_SCHEMA.findOne({ _id: req.params.id}).lean();

    res.render("notes/note", {title:"single note", payload})
})

//! HTTP Method => POST public access 

router.post("/create-note", async(req,res) =>{
    await NOTE_SCHEMA.create(req.body);
    res.redirect("/",302,{});
})

//! edit route 


router.get("/edit/:id", async (req, res) => {
    let editPayload = await NOTE_SCHEMA.findOne({_id: req.params.id,}).lean();
    res.render("notes/edit-note", { title: "edit notes", editPayload });
  });

//! PUT REQUEST

router.put("/edit/:id", async (req, res) => {
    try {
      let editPayload = await NOTE_SCHEMA.findOne({ _id: req.params.id });
      editPayload.title = req.body.title;
      editPayload.description = req.body.description;
      
  
      //! after editing save into database 

      editPayload.save();
      res.redirect("/", 302, {});
    } catch (error) {
      console.log(error);
    }
  });



//! delete 


router.delete("/delete/:id", async (req, res) => {
    await NOTE_SCHEMA.deleteOne({ _id: req.params.id });
    res.redirect("/", 302, {});
  });

module.exports = router ;
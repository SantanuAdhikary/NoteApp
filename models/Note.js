const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required:true,
        }, 

        category:{
            type:String,
            required:true,
            enum:["frontend","backend","database","cloud_computing","ml"]
        },
        description: {
            type :String
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("note",NoteSchema);
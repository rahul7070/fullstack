const express = require("express");
const notesRouter = express.Router();
const {NotesModel} = require("../model/notes.model")
const jwt = require("jsonwebtoken")


//add product 
notesRouter.post("/add", async (req, res) => {
    try {
        let payload = new NotesModel(req.body)
        await payload.save()
        res.send({"msg":"notes added successfully"})
    } catch (error) {
        res.json({ "msg": error.message })
    }
})

//get products
notesRouter.get("/", async (req, res)=>{
    try {
        let dataarr =await NotesModel.find({userID:req.body.userID})
        res.send(dataarr)
    } catch (error) {
        res.json({ "msg": error.message })
    }
})

//update
notesRouter.patch("/update/:id", async (req, res)=>{
    const {id} = req.params
    console.log(req.body)
    try {
        let data = await NotesModel.findByIdAndUpdate({userID: req.body.userID, _id: id}, req.body)
        res.send({"msg":"updated successfully"})
    } catch (error) {
        res.send(error)
    }
})

//delete
notesRouter.delete("/delete/:id", async (req, res)=>{
    const {id} = req.params
    try {
        await NotesModel.findByIdAndDelete({userID: req.body.userID, _id: id})
        res.send({"msg":"deleted successfully"})
    } catch (error) {
        res.send(error)
    }
})

module.exports = {notesRouter}
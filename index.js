const express = require("express");
require("dotenv").config()

const {connection} = require("./db");
const { auth } = require("./middlewares/auth.middleware");
const { notesRouter } = require("./route/notes.routes");
const { userRouter } = require("./route/user.routes");
// const cors = require('cors')


const app = express();

app.get("/", (req, res)=>{
    res.send("hello worls")
})

// app.use(cors())

app.use(express.json());
app.use("/users", userRouter)
app.use(auth)
app.use("/notes", notesRouter)


app.listen(process.env.port,async ()=>{
    try {
        connection
        console.log("connection established")
        console.log(`connected to ${process.env.port}`)
    } catch (error) {
        console.log("error in connection")
    }
})
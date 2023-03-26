const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const  jwt  = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { email, pass, location } = req.body;
    bcrypt.hash(pass, 5, async (error, hash) => {
        if (hash) {
            let payload = new UserModel({ email, pass: hash, location })
            payload.save()
            res.send({"msg":"registered successfully"})
        } else {
            res.status(400).send(error.message)
        }
    })
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const saved_data = await UserModel.findOne({ email });
        if (saved_data) {
            await bcrypt.compare(pass, saved_data.pass, async (error, decoded) => {
                let user_id = saved_data._id;
                // console.log(saved_data)
                if (decoded) {
                    res.send({ "msg": "login successfull", "token": jwt.sign({ "userID": user_id }, "rahul", { expiresIn: "1h" }) })
                } else {
                    res.send("wrong password")
                }
            })
        } else {
            res.send("no person with this email present")
        }
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = { userRouter }
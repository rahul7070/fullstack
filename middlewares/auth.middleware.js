const jwt = require("jsonwebtoken")

const auth = async (req, res, next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1] || req.headers.authorization.split(" ")[0];
        jwt.verify(token, 'rahul', async function(err, decoded) {
            if(decoded){
                // console.log(decoded.userID)
                req.body.userID = decoded.userID
                next()
            }else{
                res.send({"msg": "wrong token"})
            }
        });
          
    } catch (error) {
        res.send(error)
    }
}

module.exports = {auth}
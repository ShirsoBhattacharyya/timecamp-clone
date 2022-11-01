const users = require("../schema/auth.schema");

const authMiddleware = async (req,res,next) => {    
    let token = req.headers.token;
    if(token){
        let [id,email,password] = token.split(":");
        let u = await users.findById(id);
        if(u.email === email && u.password === password){
            req.userId = id;
            next();
        }else{
            res.status(401).send("Not Authorised");
        }
    }else{
        res.status(401).send("Not Authorised");
    }
}
module.exports=authMiddleware;